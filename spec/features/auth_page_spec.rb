require 'rails_helper'

RSpec.describe AuthController, type: :feature, js: true do

  describe 'GET :login' do
    before do 
      visit('/login')
    end

    it 'render :login template' do
      expect(find('.login')).to have_content('Log in to your account')
      expect(find('.login')).to have_content("Don't have an account?")
      expect(find('.login')).to have_content('Sign Up')
      expect(find('.login')).to have_content('Email address')
      expect(find('.login')).to have_content('Password')
      expect(find('.login')).to have_content('Log in')
      expect(find('.login')).to have_content(I18n.t('pages.login.form.login_trouble'))
      expect(find('span#forgot-pwd-addon a')).to have_text(I18n.t('pages.login.form.forgot_pwd'))
      expect(page).to have_css('nav')
      expect(page).not_to have_css('footer')
    end

    it 'click on forgot password link' do
      click_on(I18n.t('pages.login.form.forgot_pwd'))
      expect(find('.forgot_pwd')).to have_content(I18n.t('pages.forgot_pwd.title'))
    end

    it 'click on Having trouble logging in link' do
      click_on(I18n.t("pages.login.form.login_trouble"))
      expect(find('.forgot_pwd')).to have_content(I18n.t('pages.forgot_pwd.title'))
    end
  end

  describe 'GET :forgot_pwd' do
    it 'render :forgot_pwd template' do
      visit('/forgot')
      expect(find('.forgot_pwd')).to have_content(I18n.t('pages.forgot_pwd.title'))
      expect(find('.forgot_pwd')).to have_content(I18n.t('pages.forgot_pwd.subtitle'))
      expect(find('label').text).to eq('Email address')
      expect(page.has_selector?('input#user_email')).to eq(true)
      expect(find_button('Submit').text).to eq('Submit')
      # expect(find('input[type="submit"]').value).to eq(I18n.t('buttons.submit'))
      expect(page).not_to have_css('footer')
      expect(page).not_to have_css('header')
    end
  end

  describe 'GET :reset_pwd' do
    it 'render :reset_pwd template' do
      visit('/reset')
      expect(find('.reset_pwd')).to have_content(I18n.t('pages.reset_pwd.title'))
      expect(find('.reset_pwd')).to have_content(I18n.t('pages.reset_pwd.subtitle'))
      expect(find('.reset_pwd')).to have_text(I18n.t('pages.reset_pwd.form.password'))
      expect(find('.reset_pwd')).to have_text(I18n.t('pages.reset_pwd.form.password_confirm'))
      
      expect(page.has_selector?('input#user_password')).to eq(true)
      expect(page.has_selector?('input#user_password_confirm')).to eq(true)
      expect(find_button(I18n.t('buttons.reset_password')).text).to eq(I18n.t('buttons.reset_password'))
      expect(page).not_to have_css('footer')
      expect(page).not_to have_css('header')
    end
  end

  describe 'GET :success' do
    it 'render :success template' do
      visit('/reset_ok')
      expect(find('.reset_pwd')).to have_content(I18n.t('pages.reset_pwd.success.title'))
      expect(find('.reset_pwd')).to have_content(I18n.t('pages.reset_pwd.success.subtitle'))
      expect(find_link(I18n.t('buttons.ok')).text).to eq(I18n.t('buttons.ok'))
      expect(page).not_to have_css('footer')
      expect(page).not_to have_css('header')
    end
  end

end