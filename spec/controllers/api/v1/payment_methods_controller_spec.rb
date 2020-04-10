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
    before {
      request.cookies[JWTSessions.access_cookie] = access_cookie
      request.headers[JWTSessions.csrf_header] = csrf_token
    }
    describe 'create a payment method' do
      let!(:country) {create(:country, code: 'US')}
      context 'success' do
        it do
          expect(user.country_id).to eq(nil)
          post :create, params: {title: 'paypal', country_code: country.code}
          expect(response_json.keys.sort).to eq(['notice', 'payment_method'])
          expect(response_json['payment_method'].values).to include('paypal')
          expect(response_json['notice']).to eq(I18n.t('pages.payments.payment_methods.add.success'))
          expect(response).to have_http_status(200)
          user.reload
          expect(user.country.code).to eq(country.code)
        end
      end
      context 'failure' do
        it 'with empty params' do
          post :create
          expect(response).to have_http_status(422)
        end
      end
    end
    describe 'delete' do
      context 'success' do
        it 'with valid param' do 
          delete :destroy, params: { id: payment_method.id }
          expect(response).to have_http_status(200)
          expect(response_json.keys.sort).to eq(['notice'])
          expect(response_json.values).to include(I18n.t('pages.payments.payment_methods.delete.success'))
        end
      end
      context 'failure' do
        it 'with invalid params' do
          delete :destroy, params: {id: ''}
          expect(response).to have_http_status(404)
          expect(response_json.keys.sort).to eq(['error'])
          expect(response_json.values).to include(I18n.t('pages.payments.payment_methods.delete.not_found'))
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
    describe 'can not delete a payment method' do
      it 'with valid id' do
        delete :destroy, params: {id: payment_method.id}
        expect(response).to have_http_status(:unauthorized)
      end
      it 'with empty id' do
        delete :destroy, params: {id: ''}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
  
end
