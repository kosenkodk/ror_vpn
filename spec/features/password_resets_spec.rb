require 'rails_helper'

RSpec.describe Api::V1::PasswordResetsController, type: :feature, js: true do
  let(:password) { 'password' }
  let(:password_confirmation) { 'password' }
  let(:email) { "test@email.com" }
  let(:user) { create(:user, email: email) }
  
  describe 'forgot password' do
    let(:email_invalid) { "test@email." }

    before do
      visit('/forgot')
    end

    context 'error' do
      it 'with invalid data' do
        # always return success message for security reasons
        click_on('Submit')
        # expect(find('.alert')).to have_text(I18n.t('api.errors.network_error'))
        expect(find('.alert')).to have_content(I18n.t('pages.forgot_pwd.success.message'))

        fill_in :user_email, with: email_invalid
        # expect(find('.alert')).to have_text(I18n.t('api.errors.network_error'))
        expect(find('.alert')).to have_content(I18n.t('pages.forgot_pwd.success.message'))

      end
    end

    context 'success' do
      it 'with valid data' do
        fill_in :user_email, with: email
        click_on('Submit')
        # expect(page).to have_css('.reset_pwd')
        expect(find('.alert')).to have_content(I18n.t('pages.forgot_pwd.success.message'))
      end
    end
  end

  describe 'reset password' do
    
    before do 
      user.generate_password_token!
      visit("/password_resets/#{user.reset_password_token}")
    end

    context 'error' do
      it 'with invalid data' do
        click_on(I18n.t('buttons.reset_password'))
        expect(find('.alert')).to have_text(I18n.t('api.errors.bad_request'))
        # expect(find('.alert')).to have_text(I18n.t('api.errors.not_found'))
      end
    end
    
    context 'success' do
      it 'with valid data' do
        
        fill_in :password, with: password
        fill_in :password_confirmation, with: password_confirmation
        # TODO: fill_in token ?
        click_on(I18n.t('buttons.reset_password'))
        
        # success message on the same page
        expect(find('.alert')).to have_text(I18n.t('pages.reset_pwd.success.message'))
        
        # success page on a new page
        # expect(page).to have_content(I18n.t('pages.reset_pwd.success.title'))
      end
    end
  end
end
