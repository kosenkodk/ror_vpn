require 'rails_helper'

RSpec.describe HomeController, type: :feature do
  describe 'Pricing Page' do
    it 'display :new form' do
      visit pricing_path
      
      expect(page).to have_content('One price for all your devices')
      expect(page).to have_content('Start my free trial')

      # expect(page).to have_css('reviews')
      expect(page).to have_content('Why the Media loves VPN')
      
      expect(page).to have_content('All plans include')
      
      # TODO: after faq implementation
      # expect(page).to have_content('Questions & Answers')
      
      expect(page).to have_css('nav')
      expect(page).to have_css('footer')
    end
  end
end