require 'rails_helper'

RSpec.describe 'Dashboard', type: :feature, js: true do
  let!(:tariff_plan_free) { create(:tariff_plan_free) }
  let!(:tariff_plan) { create(:tariff_plan) }
  let!(:user) { create(:user, tariff_plan_id: tariff_plan_free) }
  let!(:paypal) { create(:payment_method, title: 'paypal', pay_id: 'paypal', is_for_signup: false) }
  let!(:bitcoin) { create(:payment_method, title: 'bitcoin', pay_id: 'bitcoin', is_for_signup: false) }
  let!(:bank_card) { create(:payment_method, title: 'bank card', pay_id: 'bank_card', is_for_signup: false) }

  describe 'plans' do
    before {
      fsign_in_as(user)
      visit('/user/dashboard')
    }
    
    describe 'change plan' do
      context 'success' do
        it 'with paypal' do
          click_on(I18n.t('buttons.start_today'), match: :first)
          click_on(I18n.t('buttons.next'))
          click_on(I18n.t('buttons.next'))
          
          id_of_select_box = 'payment_methods'
          select(paypal.title, from: id_of_select_box)
          # find('#'+id_of_select_box).select(cancel_reason.title)
          expect(find('#'+id_of_select_box).value.to_i).to eq(paypal.id)
          
          click_on(I18n.t('buttons.next'))
          alert_have_text(I18n.t('pages.dashboard.plans.change.success'))
        end

        it 'pay with bank card' do
          click_on(I18n.t('buttons.start_today'), match: :first)
          click_on(I18n.t('buttons.next'))
          click_on(I18n.t('buttons.next'))
          
          id_of_select_box = 'payment_methods'
          select(bank_card.title, from: id_of_select_box)
          # find('#'+id_of_select_box).select(cancel_reason.title)
          expect(find('#'+id_of_select_box).value.to_i).to eq(bank_card.id)
          
          expect(page).to have_field('full_name')
          expect(page).to have_field('card_no')
          expect(page).to have_field('card_date')
          expect(page).to have_field('card_code')
          expect(page).to have_field('country_code')
          expect(page).to have_field('zip_code')

          fill_in :full_name, with: 'full_name'
          fill_in :card_no, with: 'card_no'
          fill_in :card_date, with: 'card_date'
          fill_in :card_code, with: 'card_code'
          # fill_in :country_code, with: 'country_code'
          fill_in :zip_code, with: 'zip_code'

          click_on(I18n.t('buttons.next'))
          alert_have_text(I18n.t('pages.dashboard.plans.change.success'))
        end
      end
    end
  end
end