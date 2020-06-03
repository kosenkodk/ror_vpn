require 'rails_helper'

RSpec.describe 'Refer Friend', type: :feature, js: true do
  let(:password) {'password'}
  let(:email) {'email@ex.com'}
  let(:emails) {'email@ex.com,email2@ex.com'}
  let!(:user) {create(:user)}

  describe 'send refer link to friends' do
     
    before {
      fsign_in_as(user)
      visit '/user/refer_friend'
    }

    it 'with emails' do
      fill_in :emails, with: emails
      click_on(I18n.t('buttons.send_invites'))      
      alert_have_text I18n.t('pages.refer_friend.send_invites.success')
      check_notification_with_title I18n.t('pages.refer_friend.send_invites.success')
    end
  end

  describe 'signup' do
    let(:user_referred) { build(:user) }

    let!(:tariff_plan) { create(:tariff_plan) }
    let!(:tariff_plan_free) {create(:tariff_plan_free)}
    let!(:payment_method1) { FactoryBot.create :payment_method, title: I18n.t('payment_method.cryptocurrencies') }
    let!(:payment_method2) { FactoryBot.create :payment_method, title: I18n.t('payment_method.qiwi')  }
    let!(:payment_method3) { FactoryBot.create :payment_method, title: I18n.t('payment_method.credit_card')  }
    
    before {
      visit("/signup/ref=#{user.ref_code}")
      # visit(user.get_refer_link)
    }

    it 'with refer link' do
      fill_in :email, with: user_referred.email
      fill_in :password, with: user_referred.password
      fill_in :password_confirmation, with: user_referred.password_confirmation
      click_on(I18n.t('buttons.continue'))
      user_referral = User.find_by(email: user_referred.email)
      expect(user_referral.referrer_id).to eq(user.id)
      # user.reload
      # expect(user.referrals).to contains(user_referral)
    end
  end

  describe 'refer program' do
    let!(:user2) {create(:user, referrer_id: user.id)}
    let!(:user3) {create(:user, referrer_id: user.id)}
    let!(:payment_method) { create(:payment_method, is_for_signup: false)}
    let!(:paypal) { create(:payment_method, title: 'paypal', pay_id: 'paypal', is_for_signup: false) }
    let!(:plan) { create(:tariff_plan_1mo)}
    let!(:plan_free) { create(:tariff_plan_free)}
    it '2 month bonus - if user refer two friends with paid subscription' do
      fsign_in_as(user2)
      visit('/user/dashboard')
      click_on(I18n.t('buttons.start_today'), match: :first)
      click_on(I18n.t('buttons.next'))
      select_by "payment_methods", payment_method.title
      click_on(I18n.t('buttons.next'))
      alert_have_text(I18n.t('pages.dashboard.plans.change.success'))
      expect(page).to have_content(user2.expired_at_humanize)
      check_notification_with_title I18n.t('pages.refer_friend.bonus.success')

      fsign_in_as(user3)
      visit('/user/dashboard')
      click_on(I18n.t('buttons.start_today'), match: :first)
      click_on(I18n.t('buttons.next'))
      select_by "payment_methods", payment_method.title
      click_on(I18n.t('buttons.next'))
      alert_have_text(I18n.t('pages.dashboard.plans.change.success'))
      expect(page).to have_content(user3.expired_at_humanize)
      check_notification_with_title I18n.t('pages.refer_friend.bonus.success')

      user.reload
      fsign_in_as(user)
      visit('/user/dashboard')
      expect(page).to have_content(user.expired_at_humanize)
      expect(user.expired_at).to be > 2.month.from_now - 1.minute
      check_notification_with_title I18n.t('pages.refer_friend.bonus.success')
    end
  end
end