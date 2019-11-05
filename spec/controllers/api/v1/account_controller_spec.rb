require 'rails_helper'

RSpec.describe Api::V1::AccountController, type: :controller do
  let(:password) { 'password' }
  let(:password_invalid) { 'password_invalid' }
  let(:password_new) { 'newpassword' }
  let(:user) { create(:user, password: password, password_confirmation: password) }
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
    context 'success' do
      let(:email) { 'new@email.com' }

      it 'with old, new and confirm passwords' do
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token
        
        patch :change_email, params: {id: user.id, email: email}
        expect(response_json['notice']).to eq(I18n.t('pages.account.change_email.success'))
        expect(response_json.keys).to eq(['notice'])
        expect(response).to have_http_status(:success)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe 'change password' do
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
    context 'failure (for authorized users)' do
      before {
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token
      }
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
    end
    context 'failure (for unauth users)' do
      it 'without access and csrf tokens' do
        patch :change_password, params: {id: user.id, password_old: password, password: password_new, password_confirmation: password_new}
        expect(response_json.values).to eq(['Unauthorized'])
        expect(response_json.keys).to eq(['error'])
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
