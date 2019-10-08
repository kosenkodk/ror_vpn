require 'rails_helper'

RSpec.describe Api::V1::SigninController, type: :controller do
  let(:user) { FactoryBot.create(:user) }
  
  describe 'POST #create' do

    let(:user_params) { { email: user.email, password: user.password } }

    context 'login' do
      it 'returns http success' do
        post :create, params: user_params
        expect(response).to be_successful
        expect(response_json.keys).to eq(['csrf'])
        expect(response.cookies[JWTSessions.access_cookie]).to be_present
      end

      it 'returns unauthorized status for invalid params' do
        post :create, params: { email: user.email, password: 'incorrect' }
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'logout > DELETE #destroy' do

    let(:access_cookie) { @tokens[:access] }
    let(:csrf_token) { @tokens[:csrf] }
   
    context 'success' do
      before do
        JWTSessions.access_exp_time = 3600

        payload = { user_id: user.id }
        session = JWTSessions::Session.new(payload: payload, 
          refresh_by_access_allowed: true, 
          namespace: "user_#{user.id}"
        )
        @tokens = session.login
      end

      it 'success' do
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token

        # # use it in the web client requests
        # headers = {
        #   'ACCEPT': 'application/json',     # This is what Rails 4 accepts
        #   # 'HTTP_ACCEPT': 'application/json', # This is what Rails 3 accepts
        #   'X-CSRF-Token': csrf_token,
        #   # 'X-Refresh-Token': '',
        #   'Authorization': 'Bearer #{access_cookie}'
        # }
        # request.headers.merge! headers
        
        delete :destroy

        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response.cookies[JWTSessions.access_cookie]).not_to be_present
        expect(response_json.values).to eq(['ok'])
        expect(response_json['notice']).to eq('ok')
        expect(response).to be_successful
      end
    end
    context 'fail' do
      before do
        # set expiration time to 0 to create an already expired access token
        JWTSessions.access_exp_time = 0

        payload = { user_id: user.id }
        session = JWTSessions::Session.new(payload: payload, 
          refresh_by_access_allowed: true, 
          namespace: "user_#{user.id}"
        )
        @tokens = session.login
      end

      it 'fail with empty tokens' do
        
        delete :destroy
        
        expect(response_json.keys).not_to eq(['csrf'])
        expect(response.cookies[JWTSessions.access_cookie]).not_to be_present
        expect(response_json.values).to eq(['Not authorized'])
        expect(response).to have_http_status(:unauthorized)
      end

      it 'fail with expired tokens' do
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token
        
        delete :destroy

        expect(response_json.values).to eq(['Forbidden'])
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

end
