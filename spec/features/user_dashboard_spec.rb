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

        xit 'with bitcoin' do
          # qr code:
          # bitcoin:<bitcoin_address>?amount=<bitcoin_amount>
        end

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
          
          bank_card_fillout

          click_on(I18n.t('buttons.next'))
          alert_have_text(I18n.t('pages.dashboard.plans.change.success'))
        end
      end

      context 'failure' do
        
      end
    end
  end
end