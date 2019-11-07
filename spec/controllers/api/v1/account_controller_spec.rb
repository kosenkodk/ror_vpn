require 'rails_helper'

RSpec.describe Api::V1::AccountController, type: :controller do
  let(:password) { 'password' }
  let(:password_invalid) { 'password_invalid' }
  let(:password_new) { 'newpassword' }
  let(:user) { create(:user, password: password, password_confirmation: password) }
  let(:user2) { create(:user, password: password, password_confirmation: password) }
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

  describe 'change email' do
    let(:email) { 'new@email.com' }

    context 'success' do
      before {
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token
      }

      it 'with valid email' do
        patch :change_email, params: {id: user.id, email: email}
        expect(response_json['notice']).to eq(I18n.t('pages.account.change_email.success'))
        expect(response_json.keys).to eq(['notice'])
        expect(response).to have_http_status(:success)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context 'failure' do
      let(:error) { I18n.t('pages.account.change_email.errors.email_invalid') }
      before {
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token
      }

      it 'with invalid email' do
        ['new@gmailcom', 'new@gmail.c', 'new@gmail', 'new@gmail.', 'new@.com', 'new@ex.c'].each do |email_invalid|
          patch :change_email, params: {id: user.id, email: email_invalid}
          change_email_check_error
        end
      end

      it 'with empty email' do
        patch :change_email, params: {id: user.id, email: ''}
        expect(response_json.keys).to eq(['error'])
        expect(response_json['error']).to eq('Bad request')
        expect(response).to have_http_status(400)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'when trying to change email of another user' do
        # sign_in_as(user)
        patch :change_email, params: {id: user2.id, email: email}
        expect(response_json.keys).to eq(['error'])
        expect(response_json['error']).to eq(I18n.t('pages.account.change_email.errors.email_invalid'))
      end
    end

    context 'failure for unauth user' do
      it 'with valid email' do
        patch :change_email, params: {id: user.id, email: email}
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

        patch :change_password, params: {id: user.id, password_old: password, password: password_new, password_confirmation: password_new}
        expect(response_json['notice']).to eq(I18n.t('pages.account.change_password.success'))
        expect(response_json.keys).to eq(['csrf', 'notice'])
        expect(response).to have_http_status(:success)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
    context 'failure' do
      it 'with invalid old password' do
        patch :change_password, params: {id: user.id, password_old: password_invalid, password: password_new, password_confirmation: password_new}
        expect(response_json.values).to eq([I18n.t('pages.account.change_password.errors.password_invalid')])        
      end
      it 'with invalid new password' do
        patch :change_password, params: {id: user.id, password_old: password, password: password_invalid, password_confirmation: password_new}
        expect(response_json.values).to eq([I18n.t('pages.account.change_password.errors.passwords_does_not_match')])        
      end
      it 'with invalid confirmation password' do
        patch :change_password, params: {id: user.id, password_old: password, password: password_new, password_confirmation: password_invalid}
        expect(response_json.values).to eq([I18n.t('pages.account.change_password.errors.passwords_does_not_match')])
      end
      it 'with empty passwords' do
        patch :change_password, params: {id: user.id, password_old: '', password: '', password_confirmation: ''}
        expect(response_json.values).to eq([I18n.t('pages.account.change_password.errors.password_invalid')])
      end
      it 'with empty new or confirmation password' do
        patch :change_password, params: {id: user.id, password_old: password, password: '', password_confirmation: ''}
        expect(response_json.values).to eq(['Bad request'])
      end
      it 'without user id' do
        patch :change_password, params: {id: '', password_old: password, password: password_new, password_confirmation: password_new}
        expect(response_json.values).to eq(['Not Found'])
      end
      it 'if new password the same as old password' do
        patch :change_password, params: {id: user.id, password_old: password, password: password, password_confirmation: password}
        expect(response_json['error']).to eq(I18n.t('pages.account.change_password.errors.use_another_password'))
      end
      it 'when trying to change password of another user' do
        # sign_in_as(user)
        patch :change_password, params: {id: user2.id, password_old: password, password: password_new, password_confirmation: password_new}
        expect(response_json.keys).to eq(['error'])
        expect(response_json['error']).to eq(I18n.t('pages.account.change_password.errors.use_another_password'))
      end
    end
  end

  describe 'failure (for unauth users)' do
    it 'without access and csrf tokens' do
      patch :change_password, params: {id: user.id, password_old: password, password: password_new, password_confirmation: password_new}
      expect(response_json.values).to eq(['Unauthorized'])
      expect(response_json.keys).to eq(['error'])
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'delete account' do
    before {
      # sign_in_as(user)
      request.cookies[JWTSessions.access_cookie] = access_cookie
      request.headers[JWTSessions.csrf_header] = csrf_token
    }

    context 'success' do
      it 'with user id' do
        delete :delete, params: {id: user.id}
        expect(response_json.values).to eq([I18n.t('pages.account.delete.success')])
        expect(response_json.keys).to eq(['notice'])
      end
    end

    context 'failure' do
      it 'without user id' do
        delete :delete, params: {id: ''}
        expect(response_json.keys).to eq(['error'])
        expect(response_json.values).to eq([I18n.t('pages.account.delete.error')])
      end
      
      it 'when delete account for other user' do
        user2 = create(:user)
        sign_in_as(user)
        delete :delete, params: {id: user2.id}
        expect(response_json.keys).to eq(['error'])
        expect(response_json.values).to eq([I18n.t('pages.account.delete.error')])
      end
    end
  end

  describe 'delete account for unauthorized user' do
    it 'failure with valid params' do
      delete :delete, params: {id: user.id}
      expect(response_json.keys).to eq(['error'])
      expect(response_json.values).to eq(['Unauthorized'])
    end
  end
end
