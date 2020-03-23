require 'rails_helper'

RSpec.describe 'Payments', type: :feature, js: true do
  let(:user) { create(:user) }

  describe 'payment methods' do

    before {
      fsign_in_as(user)
      visit('/user/payments')
    }
    
    describe 'create' do
      context 'success' do
        it 'with valid data' do
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.title'))
          click_on(I18n.t('pages.payments.payment_methods.add_bank_card'))
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.add_bank_card'))
          bank_card_fillout
          click_on(I18n.t('buttons.save'))
          alert_have_text(I18n.t('pages.payments.payment_methods.add.success'))
        end
      end
      context 'failure' do
        xit 'with empty data' do
          click_on(I18n.t('pages.payments.payment_methods.add_bank_card'))
          click_on(I18n.t('buttons.save'))
          # alert_have_text('Title can\'t be blank')
          alert_have_text(I18n.t('pages.payments.payment_methods.add.error'))
        end
        it 'with invalid card date' do
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.title'))
          click_on(I18n.t('pages.payments.payment_methods.add_bank_card'))
          expect(page).to have_content(I18n.t('pages.payments.payment_methods.add_bank_card'))
          bank_card_fillout
          year_now = DateTime.now.strftime('%y').to_i
          month_now = DateTime.now.month
          fill_in :card_date, with: "#{month_now}#{year_now-1}"
          expect(page).to have_content('Invalid expiration date')
          fill_in :card_date, with: "#{month_now-1}#{year_now}"
          expect(page).to have_content('Invalid expiration date')
          fill_in :card_date, with: "#{13}#{year_now}"
          expect(page).to have_content('Invalid expiration date')
          fill_in :card_date, with: "#{12}#{year_now+20}"
          expect(page).to have_content('Invalid expiration date')
          
          click_on(I18n.t('buttons.save'))
          expect(page).to have_content('Invalid expiration date')
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