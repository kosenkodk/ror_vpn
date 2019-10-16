require 'rails_helper'

RSpec.describe Api::V1::ContactsController, type: :feature, js: true do
  
  before do
    visit '/contact_us'
  end

  describe 'Contact Us Page' do
    it 'display :new form' do
      expect(page).to have_content('Contact us')
      expect(page).to have_content('Send us a message and we will be in touch within 24 hours.')
    end
  end

  describe 'POST :create' do
    context 'valid data' do
      it 'with correct email' do
        expect(page).to have_content('Send us a message and we will be in touch within 24 hours.')
        fill_in('contact[email]', with: 'email@example.com')
        # fill_in('contact_message', with: 'message')
        # fill_in('contact_message_short', with: 'message short')
        # select('Option', from: 'Alpha Department')

        click_button('Submit')
        success_message = I18n.t('pages.contact_us.success_message') # 'Your message has been created'
        expect(find('#flash_message')).to have_text(success_message)

        # resubmit the same email (unique email is false)
        click_button('Submit')
        expect(find('#flash_message')).to have_text(success_message)
      end
    end
    context 'invalid data' do
      it 'with empty email' do
        click_on('Submit')
        expect(find('#flash_message')).to have_text("Email can't be blank")
      end
      it 'with invalid email' do
        fill_in('contact[email]', with: 'email@example.c')
        click_button('Submit')
        expect(find('#flash_message')).to have_text("Email is invalid")
      end
    end
  end
end