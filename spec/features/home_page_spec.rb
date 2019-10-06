require 'rails_helper'

RSpec.describe HomeController, type: :feature do
  let!(:feature) { FactoryBot.create(:feature, title: 'Feature1Title', subtitle: 'Feature1Subtitle', text: 'Feature1Text') }

  before(:each) do
    visit(root_path)
  end
  
  describe 'home page', js: true do

    context 'checking links' do
      it 'render login page' do
        click_on(I18n.t('nav_menu.sign_in'))
        expect(page).to have_content(I18n.t('pages.login.title'))
        expect(page).not_to have_css('footer')
      end

      it 'render pricing page' do
        click_on(I18n.t('buttons.view_pricing'))
        expect(page).to have_content(I18n.t('pages.pricing.title'))
        expect(page).to have_css('footer')
      end
    end

    it 'features section > view item' do
      # feature react section (client js side rendering)
      expect(page).to have_content('Feature1Title')
      expect(page).to have_content('Feature1Subtitle')
      expect(page).to have_content('Feature1Text')
    end
  end

  describe 'GET main/home page (ssr)' do

    it 'renders :index template' do
      # nav menu
      expect(page).to have_content('Features')
      expect(page).to have_content('Pricing')
      expect(page).to have_content('Apps')
      expect(page).to have_content('Help')
      expect(page).to have_content(I18n.t('nav_menu.sign_in'))
      expect(page).to have_content(I18n.t('nav_menu.sign_up'))
      # sections
      expect(page).to have_content('Take control of who has access to your private data')
      expect(page).to have_content('Why the Media loves VPN')
      expect(page).to have_content('Built for security and trust')
      expect(page).to have_content('One account for all your devices')
      # # feature react section (server side rendering)
      # expect(page).to have_content('Feature1Title')
      # expect(page).to have_content('Feature1Subtitle')
      # expect(page).to have_content('Feature1Text')
      # footer section
      expect(page).to have_content('PRODUCT')
      expect(page).to have_content('COMPANY')
      expect(page).to have_content('SECURITY')
      expect(page).to have_content('DOWNLOAD')
      expect(page).to have_content('SUPPORT')
      expect(page).to have_content('CONTACT')
    end

    it 'renders contact us page' do
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
