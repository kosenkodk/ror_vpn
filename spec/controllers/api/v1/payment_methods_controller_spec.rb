require 'rails_helper'

RSpec.describe Api::V1::PaymentMethodsController, type: :controller do
  let(:payment_method_title) { 'Bitcoin'}
  describe 'index' do
    it 'for signup page' do
      get 'for_signup'
      expect(response).to have_http_status(200)
      expect(response_json[0].keys.sort).to eq(['active_class', 'icon_urls', 'id', 'title'])
      expect(response_json[0].values).to include(payment_method_title)
      expect(response_json[0]['title']).to eq(payment_method_title)
    end
  end
end
