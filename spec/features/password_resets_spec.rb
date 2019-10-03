require 'rails_helper'

RSpec.describe Api::V1::PasswordResetsController, type: :feature, js: true do

  describe 'forgot password' do
    let(:email) { "test@email.com" }
    let(:email_invalid) { "test@email." }

    before do 
      visit('/forgot')
    end

    context 'error' do
      it 'with invalid data' do
        click_on('Submit')
        expect(find('.alert')).to have_text(I18n.t('errors.api.network_error'))

        fill_in :user_email, with: email_invalid
        expect(find('.alert')).to have_text(I18n.t('errors.api.network_error'))
      end
    end

    context 'success' do
      it 'with valid data' do
        fill_in :user_email, with: email
        click_on('Submit')
        expect(page).to have_css('.reset_pwd')
      end
    end
  end

  describe 'reset password' do
    let(:password) { 'password' }
    let(:password_confirm) { 'password' }
    
    before do 
      visit('/reset')
    end

    context 'error' do
      it 'with invalid data' do
        click_on(I18n.t('buttons.reset_password'))
        expect(find('.alert')).to have_text(I18n.t('errors.api.not_found'))
      end
    end
    
    context 'success' do
      it 'with valid data' do
        fill_in :user_password, with: password 
        fill_in :password_confirm, with: password_confirm
        # TODO: fill_in token ?
        click_on(I18n.t('buttons.reset_password'))
        # success page
        expect(page).to have_content(I18n.t('pages.reset_pwd.success.title'))
      end
    end
  end
end
