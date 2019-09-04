require 'rails_helper'

RSpec.describe HomeController, type: :feature do
  describe 'GET main/home page' do
    it 'renders :index template' do
      visit('/')
      # nav menu
      expect(page).to have_content('Features')
      expect(page).to have_content('Pricing')
      expect(page).to have_content('Apps')
      expect(page).to have_content('Help')
      expect(page).to have_content('Log in')
      expect(page).to have_content('Sign up')
      # sections
      expect(page).to have_content('Take control of who has access to your private data')
      expect(page).to have_content('Why the Media loves VPN')
      expect(page).to have_content('Built for security and trust')
      expect(page).to have_content('One account for all your devices')
      # footer section
      expect(page).to have_content('PRODUCT')
      expect(page).to have_content('COMPANY')
      expect(page).to have_content('SECURITY')
      expect(page).to have_content('DOWNLOAD')
      expect(page).to have_content('SUPPORT')
      expect(page).to have_content('CONTACT')
    end
    it 'renders contact us page' do
      visit root_path
      click_on('Contact Us')
      expect(page).to have_content('Contact us')
      expect(page).to have_content('Send us a message and we will be in touch within 24 hours.')
      expect(page).to have_content('Submit')
    end
  end
end
