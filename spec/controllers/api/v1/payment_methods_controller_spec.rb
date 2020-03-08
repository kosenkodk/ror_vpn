require 'rails_helper'

RSpec.describe Api::V1::PaymentMethodsController, type: :controller do
  let(:payment_group_title) { 'Cryptocurrencies'}
  let(:payment_method_title) { 'Bitcoin'}
  let!(:payment_group) { create(:payment_group, title: payment_group_title, is_on_main_page: true)}
  let!(:payment_method) { create(:payment_method, title: payment_method_title, is_for_signup: true)}
  describe 'index' do
    it 'for signup page' do
      get 'for_signup'
      expect(response).to have_http_status(200)
      expect(response_json[0].keys.sort).to eq(['active_class', 'icon_urls', 'id', 'title'])
      expect(response_json[0].values).to include(payment_method_title)
      expect(response_json[0]['title']).to eq(payment_method_title)
    end
    it 'payment groups' do
      payment_method.payment_group_id = payment_group
      get 'groups'
      expect(response).to have_http_status(200)
      expect(response_json[0].values).to include(payment_group_title)
      expect(response_json[0].values).to include(payment_method_title)
    end
  end
end
