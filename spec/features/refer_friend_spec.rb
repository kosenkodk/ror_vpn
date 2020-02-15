require 'rails_helper'

RSpec.describe 'Refer Friend', type: :feature, js: true do
  let(:password) {'password'}
  let(:email) {'email@ex.com'}
  let(:emails) { 'email@ex.com,email2@ex.com' }
  let!(:user) {create(:user)}
  let(:user_referred) { build(:user)}

  before {
    fsign_in_as(user)
    visit '/user/refer_friend'
  }

  describe 'send refer link to friends' do
    it 'with emails' do
      fill_in :emails, with: emails
      click_on(I18n.t('buttons.send_invites'))
      # expect(find('.alert')).to eq(I18n.t('pages.refer_friend.send_invites.success'))
      
      # alert_have_text I18n.t('pages.refer_friend.send_invites.error')
      alert_have_text I18n.t('pages.refer_friend.send_invites.success')
    end
  end

  
  context 'signup' do
    it 'with refer link' do
      visit("/signup?refer=#{user.id}")
      fill_in :email, with: user_referred.email
      fill_in :password, with: user_referred.password
      fill_in :password_confirmation, with: user_referred.password_confirmation
      click_on(I18n.t('buttons.continue'))
      user_referred = User.find_by(email: user_referred.email)
      expect(user_referred.referrer).to eq(user) # todo
      user.reload
      expect(user.referrals).to contains(user_referred)
    end
  end
end