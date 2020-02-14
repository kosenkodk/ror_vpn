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
      # expect(response_json).to eq({})
      expect(response_json['refer_link']).to eq(user.get_refer_link)
      expect(response).to have_http_status(:success)
    end

    it 'send refer link to emails' do
      post :create, params: {emails: 'email@ex.com,email2@ex.com'}
      expect(response).to have_http_status(:success)
    end

    it 'send refer link to email' do
      post :create, params: {emails: 'email@ex.com'}
      expect(response).to have_http_status(:success)
    end

    it 'send refer link to empty email' do
      post :create, params: {emails: ''}
      expect(response).to have_http_status(:success)
    end

    it 'send refer link with no params' do
      post :create
      expect(response).to have_http_status(:success)
    end

    it 'send refer link to friend using email'
  end
  
  context 'signup' do
    it 'with refer link'
    it 'display message in notifications after signup'
  end

  context 'if reffered friend bought a paid subscription' do
    it 'add bonus (get 1/1.5/2 month(-s) for 1mo/3mo/year subscription for free) for both users'
    it 'display a message in notifications for both users'
  end
end
