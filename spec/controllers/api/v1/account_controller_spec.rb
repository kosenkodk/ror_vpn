require 'rails_helper'

RSpec.describe Api::V1::AccountController, type: :controller do
  let(:password) { 'password' }
  let(:password_invalid) { 'password_invalid' }
  let(:password_new) { 'newpassword' }
  let(:tariff_plan) {create(:tariff_plan)}
  let(:tariff_plan_free) {create(:tariff_plan_free)}
  let(:user) { create(:user, password: password, password_confirmation: password, tariff_plan: tariff_plan) }
  let(:access_cookie) { @tokens[:access] }
  let(:csrf_token) { @tokens[:csrf] }
  
  before {
    # JWTSessions.access_exp_time = 3600
    payload = { user_id: user.id }
    session = JWTSessions::Session.new(payload: payload, 
      refresh_by_access_allowed: true, 
      namespace: "user_#{user.id}"
    )
    @tokens = session.login
  }

  describe 'cancel account' do
    let!(:cancel_reason) { create(:cancel_reason) }
    let(:cancel_account_reason_text) {'cancel account reason'}
    let(:cancel_params_valid) {{ cancel_account_reason_text: cancel_account_reason_text, cancel_account_reason_id: 0 }}

    context 'success' do
      before {
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token
      }
      
      it 'get account cancellation reasons' do
        get :cancel_account_reasons
        expect(response).to have_http_status(:success)
        expect(response_json).not_to eq([])
      end

      it 'save account cancellation reason data' do
        post :cancel, params: cancel_params_valid
        expect(user.cancel_account_reason_text).to eq(cancel_account_reason_text)
      end

      it 'reset to free plan' do
        post :cancel, params: cancel_params_valid
        expect(user.tariff_plan.title).to eq(tariff_plan.title)

        expect(response_json['notice']).to eq(I18n.t('pages.account.cancel.success'))
        expect(response).to have_http_status(:success)

        # reset to free plan
        expect(user.tariff_plan.title).to eq(tariff_plan_free.title)
        expect(user.tariff_plan.price).to eq(tariff_plan_free.price)
      end
    end
  end

  describe 'change email' do
    let(:email) { 'new@email.com' }
    let(:email_params_valid) { { email: email, password: password } }
    let(:email_params_invalid) { { email: email, password: password_invalid } }

    context 'success' do
      before {
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token
      }

      it 'with valid email' do
        patch :change_email, params: email_params_valid
        expect(response_json['notice']).to eq(I18n.t('pages.account.change_email.success'))
        expect(response_json.keys).to eq(['notice'])
        expect(response).to have_http_status(:success)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context 'failure' do
      before {
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token
      }

      it 'with invalid email' do
        ['new@gmailcom', 'new@gmail.c', 'new@gmail', 'new@gmail.', 'new@.com', 'new@ex.c'].each do |email_invalid|
          patch :change_email, params: {email: email_invalid, password: password}
          expect(response_json['error']).to eq(I18n.t('pages.account.change_email.errors.email_invalid'))
        end
      end

      it 'with empty email' do
        patch :change_email, params: {email: '', password: password}
        expect(response_json.keys).to eq(['error'])
        expect(response_json['error']).to eq(I18n.t('pages.account.change_email.errors.email_invalid'))
        # expect(response).to have_http_status(400)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'with wrong password' do
        patch :change_email, params: {email: email, password: ''}
        expect(response_json.keys).to eq(['error'])
        expect(response_json['error']).to eq(I18n.t('api.errors.invalid_password'))
        # expect(response).to have_http_status(401)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'with empty email and password' do
        patch :change_email, params: {email: '', password: ''}
        expect(response_json.keys).to eq(['error'])
        expect(response_json['error']).to eq(I18n.t('api.errors.invalid_password'))
        # expect(response).to have_http_status(401)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context 'failure for unauth user' do
      it 'with valid email' do
        patch :change_email, params: email_params_valid
        expect(response_json.keys).to eq(['error'])
        expect(response_json['error']).to eq('Unauthorized')
        expect(response).to have_http_status(401)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe 'change password' do
    before {
      request.cookies[JWTSessions.access_cookie] = access_cookie
      request.headers[JWTSessions.csrf_header] = csrf_token
    }
    context 'success' do
      it 'with old, new and confirm passwords' do
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token

        patch :change_password, params: {password_old: password, password: password_new, password_confirmation: password_new}
        expect(response_json['notice']).to eq(I18n.t('pages.account.change_password.success'))
        expect(response_json.keys).to eq(['csrf', 'notice'])
        expect(response).to have_http_status(:success)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
    context 'failure' do
      it 'with invalid old password' do
        patch :change_password, params: {password_old: password_invalid, password: password_new, password_confirmation: password_new}
        expect(response_json.values).to eq([I18n.t('pages.account.change_password.errors.password_invalid')])        
      end
      it 'with invalid new password' do
        patch :change_password, params: {password_old: password, password: password_invalid, password_confirmation: password_new}
        expect(response_json.values).to eq([I18n.t('pages.account.change_password.errors.passwords_does_not_match')])        
      end
      it 'with invalid confirmation password' do
        patch :change_password, params: {password_old: password, password: password_new, password_confirmation: password_invalid}
        expect(response_json.values).to eq([I18n.t('pages.account.change_password.errors.passwords_does_not_match')])
      end
      it 'with empty passwords' do
        patch :change_password, params: {password_old: '', password: '', password_confirmation: ''}
        expect(response_json.values).to eq([I18n.t('pages.account.change_password.errors.password_invalid')])
      end
      it 'with empty new or confirmation password' do
        patch :change_password, params: {password_old: password, password: '', password_confirmation: ''}
        expect(response_json.values).to eq([I18n.t('api.errors.bad_request')])
      end
      it 'if new password the same as old password' do
        patch :change_password, params: {password_old: password, password: password, password_confirmation: password}
        expect(response_json['error']).to eq(I18n.t('pages.account.change_password.errors.use_another_password'))
      end
    end
  end

  describe 'failure (for unauth users)' do
    it 'without access and csrf tokens' do
      patch :change_password, params: {password_old: password, password: password_new, password_confirmation: password_new}
      expect(response_json.values).to eq(['Unauthorized'])
      expect(response_json.keys).to eq(['error'])
      expect(response).to have_http_status(:unauthorized)
    end
  end

  let(:message) {'delete reason'}
  let(:email_contact) {'contactme@email.com'}
  let(:delete_params_valid) {{password: password, email_contact: email_contact, message: message}}
  let(:delete_params_invalid) {{password: password_invalid, email_contact: email_contact, message: message}}
  let(:delete_params_empty) {{password: '', email_contact: '', message: ''}}

  describe 'delete account' do

    before {
      # sign_in_as(user)
      request.cookies[JWTSessions.access_cookie] = access_cookie
      request.headers[JWTSessions.csrf_header] = csrf_token
    }

    context 'success' do
      it 'if user is signed in' do
        delete :delete, params: delete_params_valid
        expect(response_json.values).to eq([I18n.t('pages.account.delete.success')])
        expect(response_json.keys).to eq(['notice'])
        item = BlackListEmail.find_by(email_contact: email_contact)
        expect(item.message).to eq(message)
        expect(item.email_contact).to eq(email_contact)
      end
    end

    context 'failure' do
      it 'with incorrect password' do
        delete :delete, params: delete_params_invalid
        expect(response_json.values).to eq([I18n.t('api.errors.invalid_password')])
        expect(response_json.keys).to eq(['error'])
      end
      it 'without params' do
        delete :delete, params: {}
        expect(response_json.values).to eq([I18n.t('api.errors.invalid_password')])
        expect(response_json.keys).to eq(['error'])
      end
      it 'with empty params' do
        delete :delete, params: delete_params_empty
        expect(response_json.values).to eq([I18n.t('api.errors.invalid_password')])
        expect(response_json.keys).to eq(['error'])
      end
    end
  end

  describe 'delete account for unauthorized user' do
    it 'failure with valid params' do
      delete :delete, params: delete_params_valid
      expect(response_json.keys).to eq(['error'])
      expect(response_json.values).to eq(['Unauthorized'])
    end
  end
end
