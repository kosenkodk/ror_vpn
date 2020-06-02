require 'rails_helper'

RSpec.describe Api::V1::SignupController, type: :controller do
  describe 'Sign up (POST #create)' do
    
    let!(:tariff_plan) { create(:tariff_plan) }
    let!(:payment_method) { create(:payment_method) }
    let(:email) { 'test@email.com' }
    let(:user_params) { { email: email, password: 'password', password_confirmation: 'password' } }
    let(:user_params_all) { { email: email, password: 'password', password_confirmation: 'password', tariff_plan_id: tariff_plan.id, payment_method_id: payment_method.id } }
    let(:user_params_invalid) { { email: '', password: 'password', password_confirmation: 'password', tariff_plan_id: tariff_plan.id, payment_method_id: payment_method.id, unknown_param: '' } }

    describe 'with refer link' do
      let!(:user_referrer) {create(:user)}
      context 'success' do
        it 'with referrer id' do
          post :create, params: { rid: user_referrer.ref_code, email: email, password: 'password', password_confirmation: 'password' }
          user_referral = User.find_by(email: email)
          expect(user_referral.referrer_id).to eq(user_referrer.id)
        end
      end
    end

    context 'success' do
      it 'without ids of tariff plan and payment method' do
        post :create, params: user_params
        # expect(response_json.values).to eq([''])
        expect(response_json.keys).to eq(['csrf'])
        expect(response.status).to eq(200)
        expect(response).to be_successful
        expect(response.cookies[JWTSessions.access_cookie]).to be_present
      end

      it 'with valid user params' do
        post :create, params: user_params_all
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
          post :create, params: user_params_all
        end.to change(User, :count).by(1)
      end
    
      it 'without payment method id' do
        post :create, params: user_params_all.except(:payment_method_id)
        expect(response.status).to eq(200)
        expect(response).to be_successful
        expect(response_json.keys).to eq(['csrf'])
        expect(response.cookies[JWTSessions.access_cookie]).to be_present
        user = User.find_by(email: email)
        expect(user.tariff_plan).to eq(tariff_plan)
        expect(user.payment_method).to eq(nil)
      end

      it 'without tariff plan id' do
        post :create, params: user_params_all.except(:tariff_plan_id)
        expect(response.status).to eq(200)
        expect(response).to be_successful
        expect(response_json.keys).to eq(['csrf'])
        expect(response.cookies[JWTSessions.access_cookie]).to be_present
        user = User.find_by(email: email)
        expect(user.tariff_plan).to eq(nil)
        expect(user.payment_method).to eq(payment_method)
      end

      it 'without both ids (tariff plan and payment method)' do
        post :create, params: user_params_all.except(:tariff_plan_id, :payment_method_id)
        expect(response.status).to eq(200)
        expect(response).to be_successful
        expect(response_json.keys).to eq(['csrf'])
        expect(response.cookies[JWTSessions.access_cookie]).to be_present
        user = User.find_by(email: email)
        expect(user.tariff_plan).to eq(nil)
        expect(user.payment_method).to eq(nil)
      end
    end

    context 'failure' do
      it do
        post :create, params: user_params_invalid
        expect(response_json.keys).to include('error')
      end
    end
  end
end
