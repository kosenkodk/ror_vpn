require 'rails_helper'

RSpec.describe Api::V1::AccountController, type: :controller do
  let(:user) { create(:user, password: 'password', password_confirmation: 'password') }
  let(:password_new) { 'newpassword' }
  let(:access_cookie) { @tokens[:access] }
  let(:csrf_token) { @tokens[:csrf] }
 
  describe 'change password' do
    context 'success' do
      before do
        # JWTSessions.access_exp_time = 3600
        payload = { user_id: user.id }
        session = JWTSessions::Session.new(payload: payload, 
          refresh_by_access_allowed: true, 
          namespace: "user_#{user.id}"
        )
        @tokens = session.login
      end
      it 'with old, new and confirm passwords' do
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token

        patch :change_password, params: {id: user.id, password_old: 'password', password: password_new, password_confirmation: password_new}
        expect(response_json.values).to eq([I18n.t('pages.account.change_password.success')])
        expect(response_json.keys).to eq(['notice'])
        expect(response).to have_http_status(:success)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
    context 'failure' do
      it 'without access token' do
        patch :change_password, params: {id: user.id, password_old: 'password', password: password_new, password_confirmation: password_new}
        expect(response_json.values).to eq(['Unauthorized'])
        expect(response_json.keys).to eq(['error'])
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
