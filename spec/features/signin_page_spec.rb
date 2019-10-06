require 'rails_helper'

RSpec.describe AuthController, type: :feature, js: true do
  let(:email) {'email@example.com'}
  let(:pwd) {'password'}
  let!(:user) {create(:user, email: email, password: pwd, password_confirmation: pwd)}
  let!(:payment_method) {create(:payment_method, title: I18n.t('pages.payment_method.credit_card'))}
  let!(:tariff_plan) {create(:tariff_plan)}

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

  describe 'signout' do
    it 'click on signout after successfull signin' do
      # fsign_up_as(user)

      fsign_in_as(user)
      expect(page).to have_content(I18n.t('nav_menu.sign_out'))

      click_on(I18n.t('nav_menu.sign_out'))
      expect(page).not_to have_content(I18n.t('nav_menu.sign_out'))
    end
  end
end
