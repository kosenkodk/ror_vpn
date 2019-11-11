require 'rails_helper'

RSpec.describe Api::V1::SignupController, type: :controller do
  describe 'POST #create' do
    let(:tariff_plan) { create(:tariff_plan) }
    let(:payment_method) { create(:payment_method) }
    let(:email) { 'test@email.com' }
    let(:user_params) { { email: email, password: 'password', password_confirmation: 'password', tariff_plan_id: tariff_plan.id, payment_method_id: payment_method.id } }

    it 'returns http success' do
      post :create, params: user_params
      expect(response.status).to eq(200)
      expect(response).to be_successful
      expect(response_json.keys).to eq(['csrf'])
      expect(response.cookies[JWTSessions.access_cookie]).to be_present
      user = User.find_by(email: email)
      expect(user.tariff_plan).to eq(tariff_plan)
      expect(user.payment_method).to eq(payment_method)
    end

    it 'creates a new user' do
      expect do
        post :create, params: user_params
      end.to change(User, :count).by(1)
    end
  end
end
