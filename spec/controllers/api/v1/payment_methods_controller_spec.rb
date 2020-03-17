require 'rails_helper'

RSpec.describe Api::V1::PaymentMethodsController, type: :controller do
  let(:payment_method_title) { 'Bitcoin' }
  let!(:payment_method) { create(:payment_method, title: payment_method_title, is_for_signup: true)}
  describe 'index' do
    it 'for signup page' do
      get 'for_signup'
      expect(response).to have_http_status(200)
      expect(response_json[0].keys.sort).to eq(['active_class', 'icon_urls', 'id', 'pay_id', 'title'])
      expect(response_json[0].values).to include(payment_method_title)
      expect(response_json[0]['title']).to eq(payment_method_title)
    end
  end
  describe 'create a payment method' do
    context 'success' do
      it do
        post :create, params: {title:'paypal'}
        expect(response).to have_http_status(200)
      end
    end
  end
end
