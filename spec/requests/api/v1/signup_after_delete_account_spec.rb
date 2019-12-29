require "rails_helper"

RSpec.describe "Sign up after delete account", type: :request do
  let(:password) { 'password' }
  let(:user) { create(:user, password: password, password_confirmation: password) }

  describe 'auth users' do
    let(:access_cookie) { @tokens[:access] }
    let(:csrf_token) { @tokens[:csrf] }
    
    let(:delete_params_valid) { { password: password } }

    before {
      payload = { user_id: user.id }
      session = JWTSessions::Session.new(payload: payload, 
        refresh_by_access_allowed: true, 
        namespace: "user_#{user.id}"
      )
      @tokens = session.login

      cookies[JWTSessions.access_cookie] = access_cookie
      @headers = { JWTSessions.csrf_header => csrf_token }
    }

    context 'success' do
      let(:user_params) { { email: 'different@email.com', password: user.password, password_confirmation: user.password } }

      it 'with the different email of deleted account' do
        delete '/api/v1/delete', params: delete_params_valid, headers: @headers
        expect(response.body).to include(I18n.t('pages.account.delete.success'))
        expect(response.status).to eq(200)

        post '/api/v1/signup', params: user_params, headers: @headers
        expect(response_json.keys).to include('csrf')
        expect(response.cookies[JWTSessions.access_cookie]).to be_present
        expect(response.status).to eq(200)
        expect(response).to be_successful
      end
    end

    context 'failure' do
      let(:user_params) { { email: user.email, password: user.password, password_confirmation: user.password } }

      it 'with the same email of deleted account' do
        delete '/api/v1/delete', params: delete_params_valid, headers: @headers
        expect(response.body).to include(I18n.t('pages.account.delete.success'))
        expect(response.status).to eq(200)

        post '/api/v1/signup', params: user_params, headers: @headers
        expect(response.body).to include(I18n.t('api.errors.deleted_account'))
        expect(response_json.keys).to include('error')
        expect(response_json.keys).not_to include(['csrf'])
        expect(response.cookies[JWTSessions.access_cookie]).not_to be_present
      end
    end
  end
end