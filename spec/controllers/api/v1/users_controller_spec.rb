require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'GET #me' do
    let(:tariff_plan) { create(:tariff_plan)}
    let(:payment_method) { create(:payment_method)}
    let(:user) { create(:user, tariff_plan: tariff_plan, expired_at: DateTime.now()) }
    before { sign_in_as(user) }

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
    let!(:plan_yearly) {create(:tariff_plan_12mo)}
    let!(:plan_monthly) {create(:tariff_plan_1mo)}
    let!(:plan_quartely) {create(:tariff_plan_3mo)}
    
    let!(:user) { FactoryBot.create(:user, tariff_plan: plan_monthly) }
    let!(:user_with_quartely_plan) { FactoryBot.create(:user, tariff_plan: plan_quartely) }
    let!(:user_with_free_plan) { FactoryBot.create(:user, tariff_plan: plan_free) }

    it 'success' do
      sign_in_as(user)
      expect(user.tariff_plan).to eq(plan_monthly)
      post :change_plan, params: {plan_id: plan_free.id}
      user.reload
      expect(user.tariff_plan).to eq(plan_free)
    end

    describe 'of user with expired subscription' do
      let!(:user_with_expired_subscription) { create(:user, tariff_plan: plan_monthly, expired_at: 2.month.ago) }
      it 'from monthly up to quartely plan' do
        sign_in_as(user_with_expired_subscription)
        post :change_plan, params: {plan_id: plan_quartely.id}
        user_with_expired_subscription.reload
        expect(user_with_expired_subscription.expired_at).to be > 1.month.from_now - 1.minute
      end
    end

    describe 'refer bonus program' do
      it 'check for refer bonus after signup'
      it '12 mo - refer friend with 1 mo'
      context 'referrer user with 12 mo/yearly plan' do
        let(:user_with_plan_year) {create(:user, tariff_plan: plan_yearly, expired_at: 1.month.from_now)}
        let(:user_refered) {create(:user, referrer_id: user_with_plan_year.id)}
        it 'get 1 mo for free of current subscription (after invite friend with paid subscription)' do
          sign_in_as(user_refered)
          post :change_plan, params: {plan_id: plan_quartely.id}
          user_with_plan_year.reload
          expect(user_with_plan_year.expired_at).to be > 2.month.from_now - 1.minute
          expect(user_with_plan_year.tariff_plan).to eq(plan_yearly)
        end
      end
    end

    it 'prolongate current subscription on 1 month' do
      sign_in_as(user_with_free_plan)

      expect(user_with_free_plan.tariff_plan).to eq(plan_free)
      post :change_plan, params: {plan_id: plan_monthly.id,
        # current_user: { expired_at: DateTime.now() + 1.month }
      }
      expect(response_json['notice']).to eq(I18n.t('pages.dashboard.plans.change.success'))
      expect(response_json['user']['tariff_plan']['id']).to eq(plan_monthly.id)
      expect(response_json['user']['expired_at_humanize']).to eq 1.month.from_now.try(:strftime, "%d/%m/%y %H:%M")
      expect(response_json['user']['expired_at_humanize']).to be > (DateTime.now() + 1.month - 1.day).try(:strftime, "%d/%m/%y %H:%M")
      expect(response_json['user']['expired_at_int']).to be > (DateTime.now() + 1.month - 1.day).to_i
      
      expect(assigns(:current_user).expired_at).to be > DateTime.now() + 1.month - 1.minute
      
      # user_with_free_plan.reload
      # expect(user_with_free_plan.expired_at).to be > DateTime.now()+1.month-1.minute
      # expect(user_with_free_plan.tariff_plan).to eq(plan_monthly)
    end
    
    context 'if reffered friend bought a paid subscription' do
      let!(:user_refered) { create(:user, referrer_id: user.id, expired_at: DateTime.now()) }
      let!(:user_refered2) { create(:user, referrer_id: user.id, expired_at: DateTime.now()) }
      let!(:paypal) { create(:payment_method, title: 'paypal', pay_id: 'paypal', is_for_signup: false) }
      
      before { sign_in_as(user_refered) }

      it 'add bonus: free 1/1/2 month(-s) trial of paid subscription [1mo/3mo/year] for both users'
      it 'add 2 month bonus for referrer user if user subscribed on year plan' do
        expiration_date_before_upgrade = user_refered.expired_at-1.minute

        post :change_plan, params: {plan_id: plan_yearly.id}
        expect(assigns(:current_user).expired_at).to be > expiration_date_before_upgrade + 1.month #2.month.from_now #DateTime.now() + 2.month - 1.day
        
        referrer = User.find(user_refered.referrer_id)
        expect(referrer).to eq(user)
        expect(assigns(:current_user)).to eq(user_refered)
        expect(assigns(:user_referrer)).to eq(user)
        
        user_refered.reload
        expect(assigns(:user_referrer).expired_at).to be > expiration_date_before_upgrade + 2.month
        expect(referrer.expired_at).to be > expiration_date_before_upgrade + 2.month

        expect(user_refered.tariff_plan).to eq(plan_yearly)
        expect(user.tariff_plan).to eq(plan_monthly)
      end
      
      it 'add 1 month bonus for referrer user if user subscribed on quartely plan' do
        sign_in_as(user_refered)
        expiration_date_before_upgrade = user_refered.expired_at-1.minute
        post :change_plan, params: {plan_id: plan_quartely.id}
        expect(assigns(:user_referrer).expired_at).to be > expiration_date_before_upgrade + 1.month
        
        user_refered.reload
        user.reload
        
        expect(user_refered.expired_at).to be > expiration_date_before_upgrade + 1.month
        expect(user.expired_at).to be > expiration_date_before_upgrade + 1.month
        
        expect(user_refered.tariff_plan).to eq(plan_quartely)
        expect(user.tariff_plan).to eq(plan_monthly)
      end

      it 'add 1 month bonus for referrer user if user subscribed on monthly plan' do
        expiration_date_before_upgrade = user_refered.expired_at - 1.minute
        post :change_plan, params: {plan_id: plan_monthly.id}
        expect(assigns(:user_referrer).expired_at).to be > expiration_date_before_upgrade + 1.month
        
        user_refered.reload
        user.reload
        
        expect(user_refered.expired_at).to be > expiration_date_before_upgrade + 1.month
        expect(user.expired_at).to be > expiration_date_before_upgrade + 1.month
        
        expect(user_refered.tariff_plan).to eq(plan_monthly)
        expect(user.tariff_plan).to eq(plan_monthly)
      end
      
      it 'get bonus for refer friend at once (one time only)' do
        user_expiration_date_before_upgrade = 1.minute.before
        expiration_date_before_upgrade = 1.minute.before
        
        post :change_plan, params: {plan_id: plan_monthly.id}
        post :change_plan, params: {plan_id: plan_monthly.id}
        expect(assigns(:user_referrer).expired_at).to be > expiration_date_before_upgrade + 1.month
        
        user_refered.reload
        user.reload
        
        expect(user_refered.expired_at).to be > expiration_date_before_upgrade + 1.month
        expect(user.expired_at).to be > expiration_date_before_upgrade + 1.month
        
        expect(user_refered.tariff_plan).to eq(plan_monthly)
        expect(user.tariff_plan).to eq(plan_monthly)

        post :change_plan, params: {plan_id: plan_monthly.id}
        post :change_plan, params: {plan_id: plan_monthly.id}
        user.reload
        expect(user.expired_at).to be > user_expiration_date_before_upgrade + 1.month
      end
      
      xit '2 mo for free if user refer two friends with paid subscription' do
        sign_in_as(user_refered)
        post :change_plan, params: {plan_id: plan_monthly.id}
        expiration_date_before_upgrade = user.expired_at - 1.minute
        user.reload

        # multiple logins are not wokring
        sign_in_as(user_refered2)
        post :change_plan, params: {plan_id: plan_monthly.id}
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
