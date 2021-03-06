require 'rails_helper'

RSpec.describe Api::V1::SigninController, type: :controller do
  let(:user) { FactoryBot.create(:user) }
  
  describe 'POST #create' do
    let(:user_params) { { email: user.email, password: user.password } }
    
    describe '2fa is enabled' do
      before { user.update(is2fa: true) }
      let(:code2fa) { ROTP::TOTP.new(user.google_secret).now }

      context 'success' do
        it 'with valid 2fa code' do
          post :create, params: { email: user.email, password: user.password, code2fa: code2fa }
          expect(response).to be_successful
          expect(response_json.keys).to eq(['csrf'])
          expect(response.cookies.keys.sort).to eq ['jwt_access']
          expect(response.cookies[JWTSessions.access_cookie]).to be_present
        end
  
        it 'with valid login and password (step 1)' do
          post :signin_check_credentials, params: user_params
          expect(response).to be_successful
        end
        it 'with valid code (step 2)' do
          code = ROTP::TOTP.new(user.google_secret).now
          post :signin_check_code, params: { email: user.email, password: user.password, code2fa: code }
          expect(response).to be_successful
          expect(response_json.keys).to eq(['notice', 'user'])
        end
      end
      context 'failure' do
        it 'with invalid 2fa code' do
          post :create, params: { email: user.email, password: user.password, code2fa: 'invalid' }
          expect(response_json['error']).to eq(I18n.t("api.errors.invalid_code"))
          # expect(response.status).to eq(401)
        end
        it 'with invalid code' do
          code = ''
          post :signin_check_code, params: { email: user.email, password: user.password, code2fa: code }
          expect(response_json['error']).to eq(I18n.t("api.errors.invalid_code"))
        end
      end
    end

    context 'login' do
      it 'returns http success' do
        post :create, params: user_params
        expect(response).to be_successful
        expect(response_json.keys).to eq(['csrf'])
        # expect(response.cookies.keys.sort).to eq ['jwt_access', 'jwt_refresh']
        expect(response.cookies[JWTSessions.access_cookie]).to be_present
      end

      it 'success after refresh' do
        payload = { user_id: user.id }
        session = JWTSessions::Session.new(payload: payload, refresh_by_access_allowed: true, namespace: "user_#{user.id}")
        session.login

        session2 = JWTSessions::Session.new(payload: session.payload, refresh_by_access_allowed: true, namespace: "user_#{user.id}")
        tokens = session2.refresh_by_access_payload

        request.cookies[JWTSessions.access_cookie] = tokens[:access]
        # request.headers[JWTSessions.access_header] = "Bearer #{tokens[:access]}"
        request.headers[JWTSessions.csrf_header] = tokens[:csrf]
        delete :destroy
     
        # expect(response).to be_successful
        expect(response.status).to eq(200)
        expect(response_json['notice']).to eq 'ok'
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
        # JWTSessions.access_exp_time = 3600

        payload = { user_id: user.id }
        session = JWTSessions::Session.new(payload: payload, 
          refresh_by_access_allowed: true, 
          namespace: "user_#{user.id}"
        )
        @tokens = session.login
      end

      it 'success with valid tokens' do
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
        JWTSessions.access_exp_time = 3600
      end

      it 'fail with empty tokens' do
        delete :destroy
        expect(response_json.keys).not_to eq(['csrf'])
        expect(response.cookies[JWTSessions.access_cookie]).not_to be_present
        expect(response_json.values).to eq(['Unauthorized'])
        expect(response).to have_http_status(:unauthorized)
      end

      it 'fail with expired tokens' do
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token
        
        delete :destroy
        # expect(response.status).to eq(200) # should return 200 with expired tokens ? refresh_by_access_allowed it seems isn't working
        expect(response_json.values).to eq(['Forbidden'])
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

end
