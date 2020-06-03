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
     
  describe 'logged in users' do
    before {
      request.cookies[JWTSessions.access_cookie] = access_cookie
      request.headers[JWTSessions.csrf_header] = csrf_token
    }

    describe 'check refer link' do
      it 'success' do
        get :check_refer_code, params: {refer_code: user.ref_code}
        expect(response).to have_http_status(:success)
        expect(response_json['success']).to eq('')
      end
      it 'failure' do
        get :check_refer_code, params: {refer_code: 'invalid_code'}
        expect(response_json['error']).to eq(I18n.t('pages.refer_friend.invalid_link'))
      end
    end

    describe 'generate refer link' do
      context 'success' do
        it do
          get :link
          # expect(response_json).to eq({})
          expect(response_json['refer_link']).to eq(user.get_refer_link)
          expect(response).to have_http_status(:success)
        end
      end
    end

    describe 'send refer link' do
      context 'success' do
        it 'send refer link to emails' do
          post :create, params: {emails: 'email@ex.com,email2@ex.com'}
          expect(response).to have_http_status(:success)
        end

        it 'send refer link to email' do
          post :create, params: {emails: 'email@ex.com'}
          expect(response).to have_http_status(:success)
        end
      end

      context 'failure' do
        it 'with empty email' do
          post :create, params: {emails: ''}
          # expect(response).to have_http_status(:bad_request)
          expect(response_json['error']).to eq(I18n.t('api.errors.email_blank'))
        end

        it 'with invalid email' do
          post :create, params: {emails: 'e@'}
          # expect(response).to have_http_status(:bad_request)
          expect(response_json['error']).to eq(I18n.t('api.errors.invalid_email'))
        end

        it 'with no params' do
          post :create
          # expect(response).to have_http_status(:bad_request)
          expect(response_json['error']).to eq(I18n.t('api.errors.email_blank'))
        end
      end
    end

    context 'if reffered friend bought a paid subscription' do
      it 'add bonus: free 1/1/2 month(-s) trial of paid subscription [1mo/3mo/year] for both users'
      it 'upgrade referrer from free to the paid subscription (1-2 mo for free)'
      it 'display a bonus message in notifications for both users'
    end
  end
end
