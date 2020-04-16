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
      check_notification_with_title I18n.t('pages.account.cancel.success')
    end
  end

  describe 'notifications page' do
    before { visit('/user/notifications') }
    it 'list' do
      expect(page).to have_content(message.title)
      expect(page).to have_content(message.created_at_humanize)
    end
  end
    
  describe 'view ticket' do
    it 'create ticket 1 and ticket 2 > check ticket navigation' do
      title = 'ticket 1'
      
      visit('/user/tickets')
      click_on(I18n.t('buttons.new'))
      
      fill_in :title, with: title
      click_on(I18n.t('buttons.submit'))

      # notifications modal popup
      click_on_notification_popup
      expect(page).to have_content(title)
      
      # notifications page
      find('#btn-view-all-notifications').click
      click_on(I18n.t('buttons.view'), match: :first)
      expect(page).to have_content(title)

      # notifications modal popup
      # click_on_notification_popup
      # click_on(I18n.t('buttons.view'), match: :first) # todo: fix Selenium::WebDriver::Error::ElementNotInteractableError: 
      # expect(page).to have_content(title)
    end
  end

  describe 'create invoice' do
    it 'check notification' do
      expect(Message.count).to eq(1)
      User.check_invoices
      expect(Message.count).to eq(2)
      expect(Message.first.title).to eq(I18n.t('pages.notifications.invoice.new'))
      click_on_notification_popup
      find('#btn-view-all-notifications').click
      expect(page).to have_content(I18n.t('pages.notifications.invoice.new'))
    end
  end
end