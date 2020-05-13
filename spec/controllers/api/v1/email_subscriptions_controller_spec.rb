require 'rails_helper'

RSpec.describe Api::V1::EmailSubscriptionsController, type: :controller do
  let(:user) { create(:user) }
  before { sign_in_as(user) }

  describe 'GET #index' do
    let!(:email_subscription) { create(:email_subscription, user: user) }

    it 'returns a success response' do
      get :index
      expect(response).to be_successful
      expect(response_json.size).to eq 1
      expect(response_json.first.values).to include(email_subscription.title)
      expect(response_json.first.keys).to include('title')
      expect(response_json.first.keys).to include('text')
    end

    it 'unauth without cookie' do
      request.cookies[JWTSessions.access_cookie] = nil
      get :index
      expect(response).to have_http_status(401)
    end
  end

end
