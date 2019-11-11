require 'rails_helper'

RSpec.describe Api::V1::SignupController, type: :controller do
  describe 'Sign up (POST #create)' do
    let!(:tariff_plan) { create(:tariff_plan) }
    let!(:payment_method) { create(:payment_method) }
    let(:email) { 'test@email.com' }
    let(:user_params) { { email: email, password: 'password', password_confirmation: 'password' } }
    let(:user_params_valid) { { email: email, password: 'password', password_confirmation: 'password', tariff_plan_id: tariff_plan.id, payment_method_id: payment_method.id } }
    let(:user_params_invalid) { { email: email, password: 'password', password_confirmation: 'password', tariff_plan_id: '', payment_method_id: '' } }
    let(:user_params_invalid2) { { email: email, password: 'password', password_confirmation: 'password', tariff_plan_id: nil, payment_method_id: nil } }

    context 'success' do
      it 'without ids oftariff plan and payment method' do
        post :create, params: user_params
        # expect(response_json.values).to eq([''])

        expect(response.status).to eq(200)
        expect(response).to be_successful
        expect(response_json.keys).to eq(['csrf'])
        expect(response.cookies[JWTSessions.access_cookie]).to be_present
      end

      it 'with valid user params' do
        post :create, params: user_params_valid
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
          post :create, params: user_params_valid
        end.to change(User, :count).by(1)
      end
    end

    xcontext 'failure' do
      it 'with empty ids (payment method and tariff plan)' do
        post :create, params: user_params_invalid
        expect(response_json.keys).to eq(['error'])
        expect(response_json.values).to eq(['Bad request'])
      end

      it 'with invalid params' do
        post :create, params: user_params_invalid2
        expect(response_json.keys).to eq(['error'])
        expect(response_json.values).to eq(['Bad request'])
      end
    end
  end
end
