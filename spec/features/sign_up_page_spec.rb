require 'rails_helper'
  
RSpec.describe AuthController, type: :feature, js: true do
  describe 'GET :signup' do
    let(:email) { 'user@email.com'}
    let(:user) { build(:user, email: email) }
    let!(:plan) { FactoryBot.create :tariff_plan, price: 1 }
    let!(:plan_free) { FactoryBot.create :tariff_plan_free }
    let!(:payment_method1) { FactoryBot.create :payment_method, title: I18n.t('payment_method.cryptocurrencies') }
    let!(:payment_method2) { FactoryBot.create :payment_method, title: I18n.t('payment_method.qiwi')  }
    let!(:payment_method3) { FactoryBot.create :payment_method, title: I18n.t('payment_method.credit_card')  }
    # before do
    #   @plan = FactoryBot.create( :tariff_plan )
    # end
    it 'render :signup template' do
      visit('/signup')
      # create an account section
      expect(find('.signup')).to have_content(I18n.t('pages.signup.steps.title1'))
      expect(find('.signup')).to have_content('Email address')
      expect(find('.signup')).to have_content('Password')
      expect(find('.signup')).to have_content(I18n.t('pages.signup.form.password_confirmation'))
      
      # Choose a plan section
      expect(find('.signup')).to have_content('Choose a plan')
      expect(find('.signup')).to have_content(I18n.t('payment_method.cryptocurrencies'))
      expect(find('.signup')).to have_content(I18n.t('payment_method.qiwi'))
      expect(find('.signup')).to have_content(I18n.t('payment_method.credit_card'))

      # Select a Payment Method section
      expect(find('.signup')).to have_content('Select a Payment Method')
      expect(find('.signup')).to have_content(I18n.t('bank_card.info'))
      expect(find('.signup')).to have_content(I18n.t('bank_card.number'))
      expect(find('.signup')).to have_content(I18n.t('bank_card.holder_name'))
      expect(find('.signup')).to have_content(I18n.t('bank_card.cvvcvc'))
      
      # tariff plans
      expect(find('.signup')).to have_css('.plans .card.active')

      # payment methods
      expect(page).to have_css('.payment_methods .card.active')
      
      expect(find('.payment_methods .tab-pane.active button').text).to eq(I18n.t('buttons.continue'))
      # expect(find('.payment_methods .tab-pane.active input[type="submit"]').value).to eq(I18n.t('buttons.continue'))
      # expect(find('input[type="submit"]').value).to eq(I18n.t('buttons.continue'))
      # expect(find('span#forgot-pwd-addon a')).to have_text(I18n.t('pages.login.form.forgot_pwd'))
      
      # check if header with nav menu and footer sections are exist
      expect(page).to have_css('nav')
      expect(page).to have_css('footer')
    end

    it "signup is ok" do
      fsign_up_as(user)
      # expect(find('.alert', match: :first)).to have_text('')
      expect(page).to have_content('Plans')
      expect(page).to have_content('Subscriptions')
      expect(page).to have_content('Billing')
      expect(page).not_to have_selector('.alert')
      expect(page).not_to have_content('Unauthorized')
      user = User.find_by(email: email)
      # user.reload
      expect(user.email).to eq(email)
      expect(user.tariff_plan).to eq(plan)
      expect(user.payment_method).to eq(payment_method3)
    end
  end
end