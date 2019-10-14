require 'rails_helper'

RSpec.describe AuthController, type: :feature, js: true do
  let(:email) {'email@example.com'}
  let(:email_invalid) {'invalid@example.com'}
  let(:password) {'password'}
  let(:password_invalid) {'password_invalid'}
  let!(:user) {create(:user, email: email, password: password, password_confirmation: password)}
  let!(:payment_method) {create(:payment_method, title: I18n.t('pages.payment_method.credit_card'))}
  let!(:tariff_plan) {create(:tariff_plan)}

  describe 'GET :signin' do
 
    before do
      visit('/signin')
    end

    context 'error' do
      it 'with invalid email and password' do
        fill_in :email, with: email_invalid
        fill_in :password, with: password_invalid
        click_on(I18n.t('buttons.login'))
        # expect(find('.alert')).to have_text(I18n.t('api.errors.not_found'))
        expect(find('.alert')).to have_text(I18n.t('api.errors.invalid_credentials'))
      end
      it 'with invalid email' do
        fill_in :email, with: email_invalid
        fill_in :password, with: password
        click_on(I18n.t('buttons.login'))
        # expect(find('.alert')).to have_text(I18n.t('api.errors.not_found'))
        expect(find('.alert')).to have_text(I18n.t('api.errors.invalid_credentials'))
      end
      it 'with invalid password' do
        fill_in :email, with: email
        fill_in :password, with: password_invalid
        click_on(I18n.t('buttons.login'))
        expect(find('.alert')).to have_text(I18n.t('api.errors.unauthorized'))
      end
    end

    context 'success' do
      it 'with valid credentials' do
        fill_in :email, with: email
        fill_in :password, with: password
        click_on(I18n.t('buttons.login'))
        expect(page).to have_content(I18n.t('nav_menu.sign_out'))
        expect(page).to have_content(I18n.t('pages.tickets.title'))
      end
    end

    context 'checking links of' do
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

  describe 'signout' do
    it 'redirect to login/signin page after signout' do
      # fsign_up_as(user)
      # JWTSessions.access_exp_time = 0

      fsign_in_as(user)
      expect(page).to have_content(I18n.t('nav_menu.sign_out'))

      click_on(I18n.t('nav_menu.sign_out'))
      expect(page).not_to have_content(I18n.t('nav_menu.sign_out'))
      expect(page).to have_selector('.container.login')
      # expect(page).to have_css('.row.home')
      # JWTSessions.access_exp_time = 3600
    end
  end

  it 'autologout after 2 hours (after login and signup) or (inactivity)'
end
