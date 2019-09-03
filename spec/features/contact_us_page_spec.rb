require 'rails_helper'

RSpec.describe ContactsController, type: :feature do
  describe 'Contact Us Page' do
    it 'display :new form' do
      visit new_contacts_path
      expect(page).to have_content('Contact us')
      expect(page).to have_content('Send us a message and we will be in touch within 24 hours.')
    end
  end
end