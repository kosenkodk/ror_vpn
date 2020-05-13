require 'rails_helper'

RSpec.describe 'HomeController', type: :feature, js: true do
  describe 'Pricing Page' do
    
    let!(:plan) { FactoryBot.create :tariff_plan, title: 'Plan for 1 year', price: 1.00 }
    let!(:plan_free) { FactoryBot.create :tariff_plan, title: 'Free plan', price: 0.00 }

    it 'display :new form' do
      visit '/pricing'
      
      expect(page).to have_content('One price for all your devices')

      click_on('Free plan')
      expect(page).to have_content('Free')
      # click_on('#pills-plan1')
      # click_button 'Free plan'
      # expect(find('#pills-tabPlanContent .card .active')).to have_text('Free')
      # expect(find('.pricing .card-title.pricing-card-title', match: :first)).to have_text('Free')

      click_on('Plan for 1 year', match: :first)
      expect(page).to have_content('Start my free trial') # button

      # expect(page).to have_css('reviews')
      expect(page).to have_content('Why the Media loves VPN')
      
      expect(page).to have_content('All plans include')
      
      # TODO: uncomment after faq implementation
      # expect(page).to have_content('Questions & Answers')
      
      expect(page).to have_css('nav')
      expect(page).to have_css('footer')
    end
  end
end