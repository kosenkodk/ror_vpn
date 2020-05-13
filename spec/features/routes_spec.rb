require 'rails_helper'

RSpec.describe 'AuthController', type: :feature, js: true do
  let(:user) { create(:user) }

  context 'after signin' do
    before { fsign_in_as(user) }

    it 'visit home page' do
      visit('/')
      is_page_error false
    end

    it 'visit contact us' do
      visit('/contact_us')
      is_page_error false
      expect(page).to have_content(I18n.t('pages.contact_us.subtitle'))
    end
  end

  context 'unauth user' do
    it 'visit dashboard page - redirect to login' do
      visit('/user/dashboard')
      expect(page).not_to have_content(I18n.t('pages.dashboard.plans.title'))
      is_page_error false
      expect(page).to have_content(I18n.t('pages.login.title'))
    end
  end
end