require 'rails_helper'

RSpec.describe AuthController, type: :feature do
  describe 'GET :login' do
    it 'render :login template' do
      visit(login_path)
      expect(find('.login')).to have_content('Log in to your account')
      expect(find('.login')).to have_content("Don't have an account?")
      expect(find('.login')).to have_content('Sign Up')
      expect(find('.login')).to have_content('Email address')
      expect(find('.login')).to have_content('Password')
      expect(find('.login')).to have_content('Log in')
      expect(find('.login')).to have_content('Having trouble logging in?')
      expect(find('span#forgot-pwd-addon a')).to have_text(I18n.t('pages.login.form.forgot_pwd'))
      expect(page).not_to have_css('footer')
    end
  end

  describe 'GET :forgot' do
    it 'render :forgot template' do
      visit(forgot_path)
      expect(find('.forgot_pwd')).to have_content(I18n.t('pages.forgot_pwd.title'))
      expect(find('.forgot_pwd')).to have_content(I18n.t('pages.forgot_pwd.subtitle'))
      expect(find('label').text).to eq('Email address')
      page.has_selector?('input.user_email')
      expect(find_button('Submit').value).to eq('Submit')
      expect(page).not_to have_css('footer')
      expect(page).not_to have_css('header')
    end
  end

end