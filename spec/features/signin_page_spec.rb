require 'rails_helper'

RSpec.describe AuthController, type: :feature, js: true do

  describe 'GET :signin' do
    
    before do 
      visit('/signin')
    end

    context 'error' do
      it 'with invalid credentials' do
        click_on('Submit')
        expect(find('.alert')).to have_text(I18n.t('signin.invalid_credentials'))
      end
    end

    context 'success' do
      it 'with valid credentials'
    end

    context 'checking links on' do
      it 'sign up page' do
        click_on(I18n.t("pages.signup.title")) # Don't have account link
        expect(page).to have_css('.signup')
      end
      it 'forgot password page' do
        click_on(I18n.t('pages.login.form.forgot_pwd'))
        expect(page).to have_css('.forgot_pwd')
      end
      it 'forgot password page' do
        click_on(I18n.t("pages.login.form.login_trouble"))
        expect(page).to have_css('.forgot_pwd')
      end
    end
  end
end
