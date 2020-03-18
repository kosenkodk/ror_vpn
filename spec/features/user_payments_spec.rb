require 'rails_helper'

RSpec.describe 'Payments', type: :feature, js: true do
  let(:user) { create(:user) }
  before {
    fsign_in_as(user)
    visit('/user/payments')
  }

  describe 'payment methods' do
    # let(:payment_method) {create(:payment_method)}
    let(:full_name) {'Test Test'}
    describe 'create a payment method' do
      context 'success' do
        it 'with valid data' do
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.title'))
          click_on(I18n.t('pages.payments.payment_methods.add_bank_card'))
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.add_bank_card'))
          expect(page).to have_field('full_name')
          expect(page).to have_field('card_no')
          expect(page).to have_field('card_date')
          expect(page).to have_field('card_code')
          expect(page).to have_field('country_code')
          expect(page).to have_field('zip_code')

          fill_in :full_name, with: full_name
          fill_in :card_no, with: 'card_no'
          fill_in :card_date, with: 'card_date'
          fill_in :card_code, with: 'card_code'
          # fill_in :country_code, with: 'country_code'
          fill_in :zip_code, with: 'zip_code'
          click_on(I18n.t('buttons.next'))
          alert_have_text(I18n.t('pages.payments.payment_methods.success'))
          expect(page).to have_content(full_name)
        end
      end
      context 'failure' do
        it 'with empty data' do
          click_on(I18n.t('pages.payments.payment_methods.add_bank_card'))
          click_on(I18n.t('buttons.next'))
          alert_have_text('Title can\'t be blank')
          # alert_have_text(I18n.t('pages.payments.payment_methods.error'))
        end
      end
    end
  end
end