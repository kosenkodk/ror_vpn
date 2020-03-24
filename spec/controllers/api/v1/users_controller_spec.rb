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
    
    context 'prolongate current subscription' do
      # let!(:user_with_free_plan) { FactoryBot.create(:user, tariff_plan: plan_free) }
      
      it 'on 1 month' do
        user_with_free_plan = FactoryBot.create(:user, tariff_plan: plan_free)
        # user_with_free_plan.expired_at = DateTime.now
        expect(user_with_free_plan.tariff_plan).to eq(plan_free)
        post :change_plan, params: {plan_id: tariff_plan.id, 
          current_user: {
            expired_at: DateTime.now() + 1.month
          }
        }
        expect(response_json['notice']).to eq(I18n.t('pages.dashboard.plans.change.success'))
        expect(response_json['user']['tariff_plan']['id']).to eq(tariff_plan.id)
        expect(response_json['user']['expired_at_humanize']).to eq 1.month.from_now.try(:strftime, "%d/%m/%y %H:%M")
        expect(response_json['user']['expired_at_humanize']).to be > (DateTime.now() + 1.month - 1.day).try(:strftime, "%d/%m/%y %H:%M")
        expect(response_json['user']['expired_at_int']).to be > (DateTime.now() + 1.month - 1.day).to_i
        
        expect(assigns(:current_user).expired_at).to be > DateTime.now()+1.month-1.minute
        # user_with_free_plan.reload
        # expect(user_with_free_plan.expired_at).to be > DateTime.now()+1.month-1.minute
        # expect(user_with_free_plan.tariff_plan).to eq(tariff_plan)
      end
    end
    context 'if reffered friend bought a paid subscription' do
      let!(:user_referrer) { create(:user, referrer_id: user.id) }
      it 'add bonus: free 1/1/2 month(-s) trial of paid subscription [1mo/3mo/year] for both users' do
        # expired_at = user.expired_at
        # expect(user.expired_at).to eq(expired_at)
        post :change_plan, params: {plan_id: tariff_plan.id}
        user.reload
        expect(user.expired_at).to be > DateTime.now() + 1.month - 1.day
      end
      it 'upgrade referrer from free to the paid subscription (1-2 mo for free)'
      it 'display a bonus message in notifications for both users'
    end
  end
end
