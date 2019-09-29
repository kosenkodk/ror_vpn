require 'rails_helper'

RSpec.describe ErrorsController, type: :feature do
  describe 'Get 404 Page' do
    before do
      visit('/404')
    end
    it 'renders not_found template' do
      expect(page).to have_content('404')
      expect(page).to have_content('Oh no!!!')
      expect(page).to have_content('You’re either misspelling the URL or requesting a page that’s no longer here.')
    end
    it 'redirect to home page after click on "Back to previous page" button'
    it 'redirect to home page after click on "Back to home page" button' do
      click_on('Back to home page')
      expect(page).not_to have_content('404')
    end
  end
end