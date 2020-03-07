require 'rails_helper'

RSpec.describe Api::V1::PaymentMethodsController, type: :controller do
  let!(:payment_method) { create(:payment_method, title: 'free', is_for_signup: true)}
  describe 'index' do
    it 'for signup page' do
      get 'for_signup'
      expect(response).to have_http_status(200)
      expect(response_json[0].keys.sort).to eq(['active_class', 'icon_urls', 'id', 'title'])
      expect(response_json[0].values).to include('free')
      expect(response_json[0]['title']).to eq('free')
    end
  end
end
