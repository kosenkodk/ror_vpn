require 'rails_helper'

RSpec.describe ErrorsController, type: :feature, js: true do
  describe 'Get 404 Page' do
    before do
      visit('/404')
    end
    it 'renders not_found template' do
      is_page_error true
    end
    it 'redirect to home page after click on "Back to previous page" button'
    it 'redirect to home page after click on "Back to home page" button' do
      click_on('Back to home page')
      expect(page).not_to have_content('404')
      expect(page).to have_css('.row.home')
      expect(page).to have_css('footer')
      expect(page).to have_css('.row.header')
    end
  end
  describe 'Get 200 page' do
    it 'display success page' do
      visit('/200')
      expect(page).to have_content('Success')
      click_on(I18n.t('buttons.ok'))
      expect(page).to have_css('.row.home')
      expect(page).to have_css('footer')
      expect(page).to have_css('.row.header')
    end
  end
  describe 'Get 204 page' do
    it 'display coming soon page' do
      visit('/204')
      is_coming_soon_page
      visit('/coming_soon')
      is_coming_soon_page
    end
  end
end