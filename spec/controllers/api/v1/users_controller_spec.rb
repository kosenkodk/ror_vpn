require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let(:tariff_plan) { create(:tariff_plan)}
  let(:payment_method) { create(:payment_method)}
  let(:user) { create(:user, tariff_plan: tariff_plan) }
  before { sign_in_as(user) }

  describe 'GET #me' do
    let!(:ticket) { create(:ticket, user: user) }

    it 'returns a success response' do
      get :me
      expect(response).to be_successful
      expect(response_json).to eq user.as_json.stringify_keys
    end

    it 'display user\'s tariff plan/subscription' do
      get :me
      expect(response_json['tariff_plan']['id']).to eq(tariff_plan.id)
      expect(response_json).to eq user.as_json.stringify_keys
      
      # user.tariff_plan_id = 1
      # user.save
      # expect(user.tariff_plan_id).to eq(1)
      # get :me
      # expect(response_json['tariff_plan']['id']).to eq(1)
      # expect(response_json).to eq user.as_json.stringify_keys
    end

    it 'display a payment methods' do
      user.payment_methods << payment_method
      user.reload
      get :me
      expect(response_json['payment_methods'].first.values).to include payment_method.title
    end
  end

  describe 'change plan' do
    let!(:plan_free) {create(:tariff_plan_free)}
    it 'success' do
      expect(user.tariff_plan).to eq(tariff_plan)
      post :change_plan, params: {plan_id: plan_free.id}
      user.reload
      expect(user.tariff_plan).to eq(plan_free)
    end
  end
end
