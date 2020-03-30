require 'rails_helper'

RSpec.describe 'Payments', type: :feature, js: true do
  let!(:user) { create(:user) }
  
  describe 'invoices' do
    let!(:invoice) { create(:invoice, no: '123', amount: 6.99, currency: '$', invoice_type: 'subscription', status: 'pay', user_id: user.id) }

    let(:valid_attributes) {
      { no: 1234, invoice_type: 0, status: 'pay', amount: 1, currency: '$', user_id: user.id }
    }

    before {
      fsign_in_as(user)
      visit('/user/payments')
    }
    
    it 'table' do
      expect(page).to have_content(I18n.t('pages.payments.invoices.title'))
      expect(page).to have_content(invoice.no)
      expect(page).to have_content("#{invoice.currency}#{invoice.amount}")
      expect(page).to have_content(invoice.status)
      expect(page).to have_content(invoice.invoice_type)
      expect(page).to have_content(invoice.created_at_humanize)
    end

    it 'customize invoice' do
      click_on(I18n.t('pages.payments.invoices.customize.btn'))
      expect(page).to have_content(I18n.t('pages.payments.invoices.customize.title'))
      fill_in :invoice_details, with: 'name'
      click_on(I18n.t('buttons.save'))
      invoice.reload
      expect(invoice.details_from).to eq('name')
    end

    it 'pay current invoice' do
      click_on(I18n.t('pages.payments.invoices.pay_current_invoice.btn'))
      expect(page).to have_content(I18n.t('pages.payments.invoices.pay_current_invoice.title'))
    end
  end

  describe 'payment methods' do

    before {
      fsign_in_as(user)
      visit('/user/payments')
    }
    
    describe 'create' do
      let(:valid_bank_card_params) {{full_name: 'Mr Test', card_no: '1234123412341234', card_date: DateTime.now.strftime('%m%y'), card_code: '123', zip_code: '123123'}}
      context 'success' do
        it 'with valid data' do
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.title'))
          click_on(I18n.t('pages.payments.payment_methods.add_bank_card'))
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.add_bank_card'))
          bank_card_fillout_with valid_bank_card_params
          click_on(I18n.t('buttons.save'))
          alert_have_text(I18n.t('pages.payments.payment_methods.add.success'))
          expect(page).to have_content('Visa (... 1234)')
        end
      end
      context 'failure' do
        xit 'with empty data' do
          click_on(I18n.t('pages.payments.payment_methods.add_bank_card'))
          click_on(I18n.t('buttons.save'))
          # alert_have_text('Title can\'t be blank')
          alert_have_text(I18n.t('pages.payments.payment_methods.add.error'))
        end
        it 'check validator - with invalid/valid zip code' do
          click_on(I18n.t('pages.payments.payment_methods.add_bank_card'))
          bank_card_fillout
          fill_in :zip_code, with: "123"
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_zip'))
          click_on(I18n.t('buttons.save'))
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_form'))

          fill_in :zip_code, with: "1234"
          expect(page).not_to have_content(I18n.t('bank_card.errors.invalid_zip'))
          click_on(I18n.t('buttons.save'))
          expect(page).not_to have_content(I18n.t('bank_card.errors.invalid_form'))
          alert_have_text(I18n.t('pages.payments.payment_methods.add.success'))
        end
        it 'with invalid card date' do
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.title'))
          click_on(I18n.t('pages.payments.payment_methods.add_bank_card'))
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.add_bank_card'))
          bank_card_fillout
          year_now = DateTime.now.strftime('%y').to_i
          month_now = DateTime.now.month
          fill_in :card_date, with: "#{month_now}#{year_now-1}"
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_date'))
          fill_in :card_date, with: "#{month_now-1}#{year_now}"
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_date'))
          fill_in :card_date, with: "#{13}#{year_now}"
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_date'))
          fill_in :card_date, with: "#{12}#{year_now+20}"
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_date'))
          
          click_on(I18n.t('buttons.save'))
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_date'))
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_form'))
        end
      end
    end

    describe 'delete' do
      let!(:user) {create(:user)}
      let!(:user2) {create(:user)}
      let!(:payment_method_of_user) {create(:payment_method, user: user)}
      let!(:payment_method_of_user2) {create(:payment_method, user: user2)}
      
      before {
        # user.payment_methods << payment_method_of_user
        # user.save
        # user.reload
        
        # user2.payment_methods << payment_method_of_user2
        # user2.save
        # user2.reload
        
        fsign_in_as(user)
        visit('/user/payments')
      }
      context 'success' do
        it 'for current user' do
          
          click_on I18n.t('pages.payments.payment_methods.add_paypal')
          click_on I18n.t('buttons.next')
          
          # expect(page).to have_content(payment_method_of_user.title)
          find('#payment_method_delete', match: :first).click
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.delete.title'))
          click_on(I18n.t('buttons.confirm'))
          alert_have_text(I18n.t('pages.payments.payment_methods.delete.success'))
          # expect(page).not_to have_content(payment_method_of_user.title)
        end
      end
      context 'failure' do
        it 'for another user'
      end
    end
  end
end