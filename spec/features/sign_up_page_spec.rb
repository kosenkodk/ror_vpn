require 'rails_helper'
  
RSpec.describe AuthController, type: :feature do
  describe 'GET :signup' do
    it 'render :signup template' do
      visit(signup_path)
      # create an account section
      expect(find('.signup')).to have_content(I18n.t('pages.signup.steps.title1'))
      expect(find('.signup')).to have_content('Email address')
      expect(find('.signup')).to have_content('Password')
      expect(find('.signup')).to have_content('Confirm password')
      
      # Choose a plan section
      expect(find('.signup')).to have_content('Choose a plan')
      expect(find('.signup')).to have_content(I18n.t('payment_method.cryptocurrencies'))
      # expect(find('.signup')).to have_content(I18n.t('payment_method.qiwi'))
      # expect(find('.signup')).to have_content(I18n.t('payment_method.credit_card'))

      # Select a Payment Method section
      expect(find('.signup')).to have_content('Select a Payment Method')
      expect(find('.signup')).to have_content(I18n.t('bank_card.info'))
      expect(find('.signup')).to have_content(I18n.t('bank_card.number'))
      expect(find('.signup')).to have_content(I18n.t('bank_card.holder_name'))
      expect(find('.signup')).to have_content(I18n.t('bank_card.cvc'))
      
      expect(find('input[type="submit"]').value).to eq(I18n.t('buttons.continue'))
      # expect(find('span#forgot-pwd-addon a')).to have_text(I18n.t('pages.login.form.forgot_pwd'))
      
      # check if header with nav menu and footer sections are exist
      expect(page).to have_css('nav')
      expect(page).to have_css('footer')
    end
  end
end