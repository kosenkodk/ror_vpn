require 'rails_helper'

RSpec.describe 'Notifications', type: :feature, js: true do
  let!(:user) { create(:user) }
  let!(:message) { create(:message, messageable: user) }

  before {
    fsign_in_as(user)
  }

  describe 'new notification' do
    let!(:cancel_reason) {create(:cancel_reason, title: 'reason')}
    it 'after cancel account' do
      visit('/user/account')
      click_on_cancel_account_link
      click_on(I18n.t('buttons.submit'))
      visit('/user/notifications')
      expect(page).to have_content(I18n.t('pages.account.cancel.success'))
    end
  end

  describe 'notifications page' do
    before { visit('/user/notifications') }
    it 'list' do
      expect(page).to have_content(message.title)
      expect(page).to have_content(message.created_at_humanize)
    end
  end
    
end