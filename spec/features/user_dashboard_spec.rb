require 'rails_helper'

RSpec.describe 'Dashboard', type: :feature, js: true do
  let!(:tariff_plan_12mo) { create(:tariff_plan_12mo) }
  let!(:tariff_plan_3mo) { create(:tariff_plan_3mo) }
  let!(:tariff_plan_1mo) { create(:tariff_plan_1mo) }
  let!(:tariff_plan_free) { create(:tariff_plan_free) }
  let!(:user) { create(:user, tariff_plan_id: tariff_plan_free) }
  let!(:bank_card) { create(:pay_with_bank_card) }
  let!(:bitcoin) { create(:pay_with_bitcoin) }
  let!(:paypal) { create(:pay_with_paypal) }
  
  describe 'plans' do
    before {
      fsign_in_as(user)
      # visit('/user/dashboard')
    }
    
    describe 'refer program' do
      let(:user_refered) { create(:user, referrer_id: user.id)}
      it 'get 2 month extra bonus to both users (when upgrade on 1 year plan)' do
        fsign_in_as(user_refered)
        click_on(I18n.t('buttons.start_today'), match: :first)
        click_on(I18n.t('buttons.next'))
        click_on(I18n.t('buttons.next'))
        
        id_of_select_box = 'payment_methods'
        select(paypal.title, from: id_of_select_box)
        # find('#'+id_of_select_box).select(cancel_reason.title)
        expect(find('#'+id_of_select_box).value.to_i).to eq(paypal.id)
        
        click_on(I18n.t('buttons.next'))
        alert_have_text(I18n.t('pages.dashboard.plans.change.success'))
        
        user_refered.reload
        expect(user_refered.expired_at).to be > 3.month.from_now - 1.minute

        user.reload
        fsign_in_as(user)
        expect(user.expired_at).to be > 2.month.from_now - 1.minute
      end

      it 'get 1 month refer bonus to both users (when upgrade on other plans)' do
        fsign_in_as(user_refered)
        within all('.plan')[1] do
          click_on(I18n.t('buttons.start_today'))
        end
        click_on(I18n.t('buttons.next'))
        click_on(I18n.t('buttons.next'))
        
        id_of_select_box = 'payment_methods'
        select(paypal.title, from: id_of_select_box)
        # find('#'+id_of_select_box).select(cancel_reason.title)
        expect(find('#'+id_of_select_box).value.to_i).to eq(paypal.id)
        
        click_on(I18n.t('buttons.next'))
        alert_have_text(I18n.t('pages.dashboard.plans.change.success'))
        
        user_refered.reload
        expect(user_refered.expired_at).to be > 2.month.from_now - 1.minute

        user.reload
        fsign_in_as(user)
        expect(user.expired_at).to be > 1.month.from_now - 1.minute
      end
    end

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

          check_notification_with_title I18n.t('pages.dashboard.plans.change.success')
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
        it 'with invalid bank card details' do
          click_on(I18n.t('buttons.start_today'), match: :first)
          click_on(I18n.t('buttons.next'))
          click_on(I18n.t('buttons.next'))
          
          id_of_select_box = 'payment_methods'
          select(bank_card.title, from: id_of_select_box)
          # find('#'+id_of_select_box).select(cancel_reason.title)
          expect(find('#'+id_of_select_box).value.to_i).to eq(bank_card.id)
          
          expect(page).to have_field('full_name')

          fill_in :full_name, with: ' '
          fill_in :full_name, with: ''
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_fullname'))
          fill_in :full_name, with: ' '
          fill_in :card_no, with: '1'
          fill_in :card_date, with: '1'
          fill_in :card_code, with: '1'
          # fill_in :country_code, with: 'country_code'
          fill_in :zip_code, with: '1'

          expect(page).to have_content(I18n.t('bank_card.errors.invalid_card_no'))
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_date'))
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_cvc'))
          expect(page).to have_content(I18n.t('bank_card.errors.invalid_zip'))
          
          # expect(page).to have_content('Please fill out this field')
          click_on(I18n.t('buttons.next'))

          expect(page).to have_content(I18n.t('bank_card.errors.invalid_form'))
        end
      end
    end
  end
end