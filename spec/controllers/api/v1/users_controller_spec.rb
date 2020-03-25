require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let(:tariff_plan) { create(:tariff_plan)}
  let(:payment_method) { create(:payment_method)}
  let(:user) { create(:user, tariff_plan: tariff_plan, expired_at: DateTime.now()) }
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
    let!(:user_with_free_plan) { FactoryBot.create(:user, tariff_plan: plan_free) }

    it 'success' do
      expect(user.tariff_plan).to eq(tariff_plan)
      post :change_plan, params: {plan_id: plan_free.id}
      user.reload
      expect(user.tariff_plan).to eq(plan_free)
    end
    
    it 'prolongate current subscription on 1 month' do
      expect(user_with_free_plan.tariff_plan).to eq(plan_free)
      post :change_plan, params: {plan_id: tariff_plan.id,
        # current_user: { expired_at: DateTime.now() + 1.month }
      }
      expect(response_json['notice']).to eq(I18n.t('pages.dashboard.plans.change.success'))
      expect(response_json['user']['tariff_plan']['id']).to eq(tariff_plan.id)
      expect(response_json['user']['expired_at_humanize']).to eq 1.month.from_now.try(:strftime, "%d/%m/%y %H:%M")
      expect(response_json['user']['expired_at_humanize']).to be > (DateTime.now() + 1.month - 1.day).try(:strftime, "%d/%m/%y %H:%M")
      expect(response_json['user']['expired_at_int']).to be > (DateTime.now() + 1.month - 1.day).to_i
      
      expect(assigns(:current_user).expired_at).to be > DateTime.now() + 1.month - 1.minute
      
      # user_with_free_plan.reload
      # expect(user_with_free_plan.expired_at).to be > DateTime.now()+1.month-1.minute
      # expect(user_with_free_plan.tariff_plan).to eq(tariff_plan)
    end
    
    context 'if reffered friend bought a paid subscription' do
      let!(:user_refered) { create(:user, referrer_id: user.id, expired_at: DateTime.now()) }
      let!(:user_refered2) { create(:user, referrer_id: user.id, expired_at: DateTime.now()) }
      let!(:tariff_plan_3mo) { create(:tariff_plan_1mo, title: 'Quartely plan') }
      let!(:tariff_plan_1mo) { create(:tariff_plan_3mo, title: 'Plan for 1 month') }
      let!(:paypal) { create(:payment_method, title: 'paypal', pay_id: 'paypal', is_for_signup: false) }
      
      before { sign_in_as(user_refered) }

      it 'add bonus: free 1/1/2 month(-s) trial of paid subscription [1mo/3mo/year] for both users'
      it 'add 2 month bonus for referrer user if user subscribed on year plan' do
        expiration_date_before_upgrade = user_refered.expired_at-1.minute

        post :change_plan, params: {plan_id: tariff_plan.id}
        expect(assigns(:current_user).expired_at).to be > expiration_date_before_upgrade + 1.month #2.month.from_now #DateTime.now() + 2.month - 1.day
        
        referrer = User.find(user_refered.referrer_id)
        expect(referrer).to eq(user)
        expect(assigns(:current_user)).to eq(user_refered)
        expect(assigns(:user_referrer)).to eq(user)
        
        user_refered.reload
        expect(assigns(:user_referrer).expired_at).to be > expiration_date_before_upgrade + 2.month
        expect(referrer.expired_at).to be > expiration_date_before_upgrade + 2.month

        expect(user_refered.tariff_plan).to eq(tariff_plan)
        expect(user.tariff_plan).to eq(tariff_plan)
      end
      
      it 'add 1 month bonus for referrer user if user subscribed on quartely plan' do
        expiration_date_before_upgrade = user_refered.expired_at-1.minute
        post :change_plan, params: {plan_id: tariff_plan_3mo.id}
        expect(assigns(:user_referrer).expired_at).to be > expiration_date_before_upgrade + 1.month
        
        user_refered.reload
        user.reload
        
        expect(user_refered.expired_at).to be > expiration_date_before_upgrade + 1.month
        expect(user.expired_at).to be > expiration_date_before_upgrade + 1.month
        
        expect(user_refered.tariff_plan).to eq(tariff_plan_3mo)
        expect(user.tariff_plan).to eq(tariff_plan_3mo)
      end

      it 'add 1 month bonus for referrer user if user subscribed on monthly plan' do
        expiration_date_before_upgrade = user_refered.expired_at - 1.minute
        post :change_plan, params: {plan_id: tariff_plan_1mo.id}
        expect(assigns(:user_referrer).expired_at).to be > expiration_date_before_upgrade + 1.month
        
        user_refered.reload
        user.reload
        
        expect(user_refered.expired_at).to be > expiration_date_before_upgrade + 1.month
        expect(user.expired_at).to be > expiration_date_before_upgrade + 1.month
        
        expect(user_refered.tariff_plan).to eq(tariff_plan_1mo)
        expect(user.tariff_plan).to eq(tariff_plan_1mo)
      end
      
      it 'get bonus for refer friend at once (one time only)' do
        user_expiration_date_before_upgrade = user.expired_at - 1.minute
        expiration_date_before_upgrade = user_refered.expired_at - 1.minute
        
        post :change_plan, params: {plan_id: tariff_plan_1mo.id}
        post :change_plan, params: {plan_id: tariff_plan_1mo.id}
        expect(assigns(:user_referrer).expired_at).to be > expiration_date_before_upgrade + 1.month
        
        user_refered.reload
        user.reload
        
        expect(user_refered.expired_at).to be > expiration_date_before_upgrade + 1.month
        expect(user.expired_at).to be > expiration_date_before_upgrade + 1.month
        
        expect(user_refered.tariff_plan).to eq(tariff_plan_1mo)
        expect(user.tariff_plan).to eq(tariff_plan_1mo)

        post :change_plan, params: {plan_id: tariff_plan_1mo.id}
        post :change_plan, params: {plan_id: tariff_plan_1mo.id}
        user.reload
        expect(user.expired_at).to be > user_expiration_date_before_upgrade + 1.month
      end
      
      xit '2 mo for free if user refer two friends with paid subscription' do
        sign_in_as(user_refered)
        post :change_plan, params: {plan_id: tariff_plan_1mo.id}
        expiration_date_before_upgrade = user.expired_at - 1.minute
        user.reload

        # multiple logins are not wokring
        sign_in_as(user_refered2)
        post :change_plan, params: {plan_id: tariff_plan_1mo.id}
        user.reload
        
        # multiple logins are not wokring
        sign_in_as(user)
        user.reload
        expect(user.expired_at).to be > expiration_date_before_upgrade + 2.month
      end

      it 'reset to datetime.now if already expired'
      it 'upgrade referrer from free to the paid subscription (1-2 mo for free)'
      it 'display a bonus message in notifications for both users'
      it 'expire subscription (change to free plan) if user does not pay on time'
      it 'send invoice after 1 month '
      it 'unpaid invoice - send remain message'
    end
  end
end
