require 'rails_helper'

RSpec.describe 'Refer Friend', type: :feature, js: true do
  let(:password) {'password'}
  let(:email) {'email@ex.com'}
  let(:emails) { 'email@ex.com,email2@ex.com' }
  let!(:user) {create(:user)}
  
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
end