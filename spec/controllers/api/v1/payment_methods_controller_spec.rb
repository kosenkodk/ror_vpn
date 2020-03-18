require 'rails_helper'

RSpec.describe Api::V1::PaymentMethodsController, type: :controller do
  let(:payment_method_title) { 'Bitcoin' }
  let!(:payment_method) { create(:payment_method, title: payment_method_title, is_for_signup: true)}
  let(:user) {create(:user)}
  let(:access_cookie) { @tokens[:access] }
  let(:csrf_token) { @tokens[:csrf] }
  
  before {
    payload = { user_id: user.id }
    session = JWTSessions::Session.new(payload: payload, 
      refresh_by_access_allowed: true, 
      namespace: "user_#{user.id}"
    )
    @tokens = session.login
  }
  
  describe 'get payment methods' do
    it 'for signup page' do
      get 'for_signup'
      expect(response).to have_http_status(200)
      expect(response_json[0].keys.sort).to eq(['active_class', 'icon_urls', 'id', 'pay_id', 'title'])
      expect(response_json[0].values).to include(payment_method_title)
      expect(response_json[0]['title']).to eq(payment_method_title)
    end
  end
  
  describe 'logged in users' do
    describe 'create a payment method' do
      before {
        request.cookies[JWTSessions.access_cookie] = access_cookie
        request.headers[JWTSessions.csrf_header] = csrf_token
      }
      context 'success' do
        it do
          post :create, params: {title: 'paypal'}
          expect(response_json.keys.sort).to eq(['notice', 'payment_method'])
          expect(response_json['payment_method'].values).to include('paypal')
          expect(response_json['notice']).to eq(I18n.t('pages.payments.payment_methods.add.success'))
          expect(response).to have_http_status(200)
        end
      end
      context 'failure' do
        it 'with empty params' do
          post :create
          expect(response).to have_http_status(422)
        end
      end
    end
  end

  describe 'guests' do
    describe 'can not create a payment method' do
      it do
        post :create, params: {title: 'paypal'}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
  
end
