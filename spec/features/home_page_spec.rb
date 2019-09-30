require 'rails_helper'



RSpec.describe HomeController, type: :feature do

  describe 'GET main/home page' do
    let!(:feature) { FactoryBot.create(:feature, title:'Feature1Title', subtitle: 'Feature1Subtitle', text: 'Feature1Text') }

    scenario 'features section > view item', js: true do
      visit(root_path)
      # feature react section (client js side rendering)
      expect(page).to have_content('Feature1Title')
      expect(page).to have_content('Feature1Subtitle')
      expect(page).to have_content('Feature1Text')
    end

    scenario 'login page > invisible footer', js: true do
      visit('/login')
      # click_on('Log in')
      expect(page).not_to have_css('footer')
    end

  
    it 'renders :index template' do
      visit(root_path)
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
      # feature react section (server side rendering)
      expect(page).to have_content('Feature1Title')
      expect(page).to have_content('Feature1Subtitle')
      expect(page).to have_content('Feature1Text')
      # footer section
      expect(page).to have_content('PRODUCT')
      expect(page).to have_content('COMPANY')
      expect(page).to have_content('SECURITY')
      expect(page).to have_content('DOWNLOAD')
      expect(page).to have_content('SUPPORT')
      expect(page).to have_content('CONTACT')
    end
    it 'renders contact us page' do
      visit(root_path)
      # within(:css, 'navbar') do
        click_on(I18n.t('nav_menu.contact_us'), match: :first)
      # end
      expect(find('.navbar')).to have_content(I18n.t('nav_menu.contact_us'))
      expect(find('.footer', match: :first)).to have_content(I18n.t('footer.contact.contact_us'))
      expect(page).to have_content('Send us a message and we will be in touch within 24 hours.')
      expect(find_button('Submit')).to have_text('Submit')
    end
  end
  
end
