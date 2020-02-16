require 'rails_helper'

RSpec.describe 'Refer Friend', type: :feature, js: true do
  let(:password) {'password'}
  let(:email) {'email@ex.com'}
  let(:emails) { 'email@ex.com,email2@ex.com' }
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
      visit("/signup/#{user.id}")
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
end