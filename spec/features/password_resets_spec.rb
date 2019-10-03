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
    context 'error' do
      it 'with invalid data'
    end
    context 'success' do
      it 'with valid data'
    end
  end
end
