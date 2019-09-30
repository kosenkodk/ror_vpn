require 'rails_helper'

RSpec.describe Api::V1::ContactsController, type: :feature, js: true do
  
  before do
    visit '/contacts/new'
  end

  describe 'Contact Us Page' do
    it 'display :new form' do
      # visit '/contacts/new'

      expect(page).to have_content('Contact us')
      expect(page).to have_content('Send us a message and we will be in touch within 24 hours.')
    end
  end

  describe 'POST :create' do
    context 'valid data' do
      it 'redirect to success page' do
        # visit '/contacts/new'
—
        expect(page).to have_content('Send us a message and we will be in touch within 24 hours.')
        fill_in('contact[email]', with: 'email@example.com')
        # fill_in('contact[email]', with: 'email@example.com')
        # fill_in('contact_message', with: 'message')
        # fill_in('contact_message_short', with: 'message short')
        # select('Option', from: 'Alpha Department')
        # click_on('Submit') # find(#contact_submit)

        # click_button('Submit')
        find('#contact_submit').click
        # find_button('Submit').click
        message = I18n.t('pages.contact_us.success_message') # 'Your message has been created'
        # expect(find('.lead').text).to eq(message)
        # expect(find('.lead')).to have_text(message)
        
        # expect(find('.alert')).to have_text(message)
        expect(find('#flash_message')).to have_text(message)
      end
    end
    context 'invalid data' do
      it 'redirect to error page' do
        # visit '/contacts/new'

        # click_on('Submit')
        find('#contact_submit').click

        message = I18n.t('pages.contact_us.error_message')
        # expect(find('.lead')).to have_text(message))
        # expect(page).to have_content(message)
        # expect(page).to have_text("Email can't be blank")

        # expect(find('.alert')).to have_text("Email can't be blank")
        expect(find('#flash_message')).to have_text("Email can't be blank")
      end
    end
  end
end