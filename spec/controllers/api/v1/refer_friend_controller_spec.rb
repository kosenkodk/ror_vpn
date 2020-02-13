require 'rails_helper'

RSpec.describe Api::V1::ReferFriendController, type: :controller do
  let(:user) { create(:user) }
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
     
  context 'success' do
    before {
      request.cookies[JWTSessions.access_cookie] = access_cookie
      request.headers[JWTSessions.csrf_header] = csrf_token
    }

    it 'generate refer link' do
      get :link
      expect(response_json).to eq({})
      expect(response).to have_http_status(:success)
    end

    it 'send refer link to emails'
    it 'send refer link to friend using email'
    it 'import emails from gmail'
  end
end
