require 'rails_helper'

RSpec.describe Api::V1::ContactsController, type: :feature, js: true do
  let!(:department_billing) {create(:department, title: 'Billing')}

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
    let(:invalid_email) {'email@ex'}
    let(:valid_email) {'email@ex.com'}

    it 'clear error after resubmit form with valid email' do
      fill_in('email', with: invalid_email)
      # click_button('Submit')
      # expect(page).to have_content("Message short can't be blank")
      
      fill_in('message_short', with: 'message short')
      click_button('Submit')
      expect(find('.alert')).to have_text("Email is invalid")
      # expect(page).not_to have_css('alert-danger')

      fill_in('email', with: valid_email)
      # fill_in('message_short', with: 'message short')
      click_button('Submit')
      expect(find('#alert')).to have_text(I18n.t('pages.contact_us.success_message'))
    end

    context 'valid data' do
      it 'with correct email' do
        expect(page).to have_content('Send us a message and we will be in touch within 24 hours.')
        fill_in('email', with: valid_email)
        
        select(department_billing.title, from: 'departmentSelectBox')
        # find("#departmentSelectBox").select(department_billing.title)
        
        # fill_in('contact[email]', with: 'email@example.com')
        # fill_in('contact_message', with: 'message')
        # fill_in('contact_message_short', with: 'message short')
        fill_in('message_short', with: 'message short')

        click_button('Submit')
        success_message = I18n.t('pages.contact_us.success_message') # 'Your message has been created'
        expect(find('.alert')).to have_text(success_message)

        # resubmit the same email (unique email is false)
        click_button('Submit')
        expect(find('#alert')).to have_text(success_message)
      end
    end

    context 'invalid data' do
      it 'with empty email' do
        fill_in('message_short', with: 'message short')
        click_on('Submit')
        # expect(find('.alert')).to have_text("Bad request")
        expect(find('.alert')).to have_text("Email can't be blank")
      end
      it 'with invalid email' do
        fill_in('email', with: invalid_email)
        fill_in('message_short', with: 'message short')
        # fill_in('contact[email]', with: 'email@example.c')
        click_button('Submit')
        # expect(find('.alert')).to have_text("Bad request")
        expect(find('.alert')).to have_text("Email is invalid")
      end
    end
  end
end