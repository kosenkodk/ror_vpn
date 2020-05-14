require 'rails_helper'

RSpec.describe 'User Account', type: :feature, js: true do
  let(:password) {'password'}
  let(:email) {'email@ex.com'}
  
  let!(:tariff_plan) {create(:tariff_plan)}
  let!(:tariff_plan_free) {create(:tariff_plan_free)}
  let!(:user) {create(:user, password: password, password_confirmation: password, tariff_plan: tariff_plan)}
  let!(:user_2fa_enabled) {create(:user, password: password, password_confirmation: password, tariff_plan: tariff_plan, is2fa: true)}
  let!(:cancel_reason) {create(:cancel_reason, title: 'reason')}
  let!(:cancel_reason2) {create(:cancel_reason, title: 'reason 2')}
  let!(:email_subscription) { create(:email_subscription) }
  let!(:email_subscription2) { create(:email_subscription) }
  
  before(:each) {
    fsign_in_as(user)
    visit '/user/account'
  }

  describe 'Email Subscriptions' do
    
    context 'check' do
      it do
        checkbox1 = "email_subscriptions#{email_subscription.id}"
        check(checkbox1, allow_label_click: true, visible: :all)
        expect(page).to have_field(checkbox1, visible: :all, checked: true)

        visit '/user/dashboard'
        visit '/user/account'

        # check(checkbox1, allow_label_click: true, visible: :all)
        expect(page).to have_field(checkbox1, visible: :all, checked: true)
      end
    end
  end

  describe '2FA Setup' do
    describe 'enable 2fa in admin panel' do
      let(:totp) { ROTP::TOTP.new(user.google_secret) }
      context 'success' do
        it 'with valid code and password' do
          expect(page).to have_field('customSwitch2fa', visible: :all, checked: false)
          check('customSwitch2fa', allow_label_click: true, visible: :all)
          expect(page).to have_content(I18n.t('buttons.next'))
          click_on(I18n.t('buttons.next'))
          click_on(I18n.t('buttons.next'))
          click_on(I18n.t('buttons.back'))
          click_on(I18n.t('buttons.next'))
          fill_in :code2fa, with: totp.now
          fill_in :password, with: user.password
          click_on(I18n.t('buttons.submit'))
          alert_have_text I18n.t('pages.account.2fa.enable.success')
          user.reload
          expect(user.is2fa).to eq(true)
          expect(page).to have_field('customSwitch2fa', visible: :all, checked: true)

          check_notification_with_title I18n.t('pages.account.2fa.enable.success')

          # should save 'enable 2fa' checkbox's state after page reload
          visit('/user/account')
          expect(page).to have_field('customSwitch2fa', visible: :all, checked: true)
        end
      end
      context 'failure' do
        it 'with empty password' do
          check('customSwitch2fa', allow_label_click: true, visible: :all)
          expect(page).to have_content(I18n.t('buttons.next'))
          click_on(I18n.t('buttons.next'))
          click_on(I18n.t('buttons.next'))
          fill_in :code2fa, with: totp.now
          click_on(I18n.t('buttons.submit'))
          alert_have_text I18n.t('api.errors.invalid_password')
          user.reload
          expect(user.is2fa).to eq(false)
        end
        it 'with empty code' do
          check('customSwitch2fa', allow_label_click: true, visible: :all)
          expect(page).to have_content(I18n.t('buttons.next'))
          click_on(I18n.t('buttons.next'))
          click_on(I18n.t('buttons.next'))
          fill_in :password, with: user.password
          click_on(I18n.t('buttons.submit'))
          alert_have_text I18n.t('pages.account.2fa.enable.error')
          user.reload
          expect(user.is2fa).to eq(false)
        end
      end
    end
    describe 'disable 2fa' do
       context 'success' do
        it 'for logged in user' do
          fsign_in_as(user_2fa_enabled)
          visit '/user/account'
          user_2fa_enabled.reload
          expect(user_2fa_enabled.is2fa).to eq(true)
          uncheck('customSwitch2fa', allow_label_click: true, visible: :all)
          user_2fa_enabled.reload
          expect(user_2fa_enabled.is2fa).to eq(false)

          check_notification_with_title I18n.t('pages.account.2fa.disable.success')
        end
       end
    end
  end

  describe 'Alerts' do
    it 'do not display the same message when open another modal popup' do
      click_on_cancel_account_link
      click_on(I18n.t('buttons.submit'))
      expect(find('.alert')).to have_text(I18n.t('pages.account.cancel.success'))
      
      click_on(I18n.t('buttons.edit'))
      expect(page).not_to have_css('alert')
      expect(page).not_to have_text(I18n.t('pages.account.cancel.success'))
      click_on(I18n.t('buttons.cancel'))

      click_on(I18n.t('pages.account.change_password.button'))
      expect(page).not_to have_css('alert')
      expect(page).not_to have_text(I18n.t('pages.account.cancel.success'))
      click_on(I18n.t('buttons.cancel'))

      click_on(I18n.t('pages.account.delete.button'))
      expect(page).not_to have_css('alert')
      expect(page).not_to have_text(I18n.t('pages.account.cancel.success'))
    end
  end

  describe 'Cancel Account' do
    let!(:cancel_account_reason_text) {'too expensive'}

    it 'reset from paid to free plan' do
      expect(page).to have_content(tariff_plan.title)
      
      click_on_cancel_account_link
      fill_in :cancel_account_reason_text, with: cancel_account_reason_text
      # click_on(I18n.t('pages.account.cancel.form.button'))
      click_on(I18n.t('buttons.submit'))
      expect(find('.alert')).to have_text(I18n.t('pages.account.cancel.success'))

      # click_on(I18n.t('buttons.cancel')) # auto close modal popup
      expect(page).to have_content(tariff_plan_free.title)
      
      user.reload
      expect(user.tariff_plan.title).to eq(tariff_plan_free.title)
      expect(user.tariff_plan.price).to eq(tariff_plan_free.price)
      expect(user.cancel_account_reason_text).to eq(cancel_account_reason_text)

      check_notification_with_title I18n.t('pages.account.cancel.success')
    end

    it 'select cancellation reason' do
      click_on_cancel_account_link
      fill_in :cancel_account_reason_text, with: cancel_account_reason_text
      
      # selectbox - select cancellation reason 
      select_cancel_account_reason cancel_reason
      select_cancel_account_reason cancel_reason2

      # click_on(I18n.t('pages.account.cancel.form.button'))
      click_on(I18n.t('buttons.submit'))
    end

    it 'select cancellation reason after cancel or close modal popup' do
      click_on_cancel_account_link
      select_cancel_account_reason cancel_reason
      select_cancel_account_reason cancel_reason2

      click_on(I18n.t('buttons.cancel'))

      click_on_cancel_account_link
      select_cancel_account_reason cancel_reason
      select_cancel_account_reason cancel_reason2
    end
  end

  describe 'Change email' do
    let(:email_new) { 'email_new@ex.com' }
    let(:email_invalid) { 'email_new@ex.' }

    context 'success' do
      it 'with valid new email' do
        # click_on(I18n.t('pages.account.change_email.button'))
        click_on(I18n.t('buttons.edit'))
        fill_in :email, with: email_new
        fill_in :password, with: password
        click_on(I18n.t('buttons.submit'))
        alert_have_text(I18n.t('pages.account.change_email.success'))
        expect(page).to have_field('email_username', with: email_new)
        expect(page).to have_field('email_recovery', with: email_new)
        expect(find('#emailInHeader')).to have_text(email_new)
        user.email = email_new

        check_notification_with_title I18n.t('pages.account.change_email.success')

        fsign_in_as(user)
        visit('/user/account')
        expect(page).to have_content('Account')
        expect(page).to have_content(email_new)
      end
      it 'clear alert on modal close event' do
        check_clear_alerts_on_modal_close I18n.t('buttons.edit'), I18n.t('buttons.submit'), I18n.t('buttons.cancel')
      end
    end
    context 'failure' do
      it 'with invalid email' do
        # click_on(I18n.t('pages.account.change_email.button'))
        click_on(I18n.t('buttons.edit'))
        fill_in :email, with: email_invalid
        fill_in :password, with: password
        click_on(I18n.t('buttons.submit'))
        alert_have_text(I18n.t('pages.account.change_email.errors.email_invalid'))
      end
      it 'with empty email' do
        # click_on(I18n.t('pages.account.change_email.button'))
        click_on(I18n.t('buttons.edit'))
        fill_in :email, with: ''
        fill_in :password, with: password
        click_on(I18n.t('buttons.submit'))
        # expect(find('.alert')).to have_text(I18n.t('api.errors.bad_request'))
        # expect(find('.alert')).to have_text(I18n.t('api.errors.invalid_email'))
        alert_have_text(I18n.t('pages.account.change_email.errors.email_invalid'))
      end
      it 'with empty password' do
        # click_on(I18n.t('pages.account.change_email.button'))
        click_on(I18n.t('buttons.edit'))
        fill_in :email, with: ''
        fill_in :password, with: ''
        click_on(I18n.t('buttons.submit'))
        # expect(find('.alert')).to have_text(I18n.t('api.errors.unauthorized'))
        alert_have_text(I18n.t('api.errors.invalid_password'))
      end
    end
  end

  describe 'Change password' do
    let(:password_invalid) {'password_invalid'}
    let(:password_new) {'password_new'}

    context 'success' do
      it 'close button of the popup window' do
        expect(page).to have_content('Account')
        click_on(I18n.t('pages.account.change_password.button'))
        expect(page).to have_content(I18n.t('pages.account.change_password.button'))
        expect(page).to have_selector('.modal.fade.show')
        click_on(I18n.t('buttons.cancel'))
        # expect(page).not_to have_content(I18n.t('buttons.cancel'))
        expect(page).not_to have_content(I18n.t('pages.account.change_password.password_confirm'))
        # expect(page).to have_selector('.modal.fade')
      end
      it 'click on save button of the popup window' do
        expect(page).to have_content('Account')
        click_on(I18n.t('pages.account.change_password.button'))
        fill_in :password_old, with: password
        fill_in :password, with: password_new
        fill_in :password_confirmation, with: password_new
        expect(page).to have_content(I18n.t('pages.account.change_password.button'))
        expect(page).to have_selector('.modal.fade.show')
        click_on(I18n.t('buttons.submit'))
        alert_have_text(I18n.t('pages.account.change_password.success'))

        check_notification_with_title I18n.t('pages.account.change_password.success')
      end
      it 'relogin in background after change password' do
        click_on(I18n.t('pages.account.change_password.button'))
        fill_in :password_old, with: password
        fill_in :password, with: password_new
        fill_in :password_confirmation, with: password_new
        click_on(I18n.t('buttons.submit'))
        alert_have_text I18n.t('pages.account.change_password.success')
        
        click_on(I18n.t('pages.account.change_password.button'))
        fill_in :password_old, with: password_new
        fill_in :password, with: password
        fill_in :password_confirmation, with: password
        click_on(I18n.t('buttons.submit'))
        alert_have_text(I18n.t('pages.account.change_password.success'))
      end
      it 'clear alerts on modal close event' do
        check_clear_alerts_on_modal_close I18n.t('pages.account.change_password.button'), I18n.t('buttons.submit'), I18n.t('buttons.cancel')
      end
    end
    context 'fail' do
      it 'with invalid old password' do
        click_on(I18n.t('pages.account.change_password.button'))
        fill_in :password_old, with: password_invalid
        fill_in :password, with: password_new
        fill_in :password_confirmation, with: password_new
        click_on(I18n.t('buttons.submit'))
        alert_have_text(I18n.t('pages.account.change_password.errors.password_invalid'))
      end
      it 'if new password and confirmation does not match' do
        click_on(I18n.t('pages.account.change_password.button'))
        fill_in :password_old, with: password
        fill_in :password, with: password_invalid
        fill_in :password_confirmation, with: password_new
        click_on(I18n.t('buttons.submit'))
        alert_have_text(I18n.t('pages.account.change_password.errors.passwords_does_not_match'))
      end
      it 'with empty passwords' do
        click_on(I18n.t('pages.account.change_password.button'))
        click_on(I18n.t('buttons.submit'))
        alert_have_text(I18n.t('pages.account.change_password.errors.password_invalid'))
      end
    end
  end

  describe 'Delete' do
    let(:email_contact) {'contact@email.com'}
    
    context 'success' do
      it 'clear alert on modal close event' do
        check_clear_alerts_on_modal_close I18n.t('pages.account.delete.button'), I18n.t('buttons.delete'), I18n.t('buttons.cancel')
      end

      it 'with valid password' do
        click_on(I18n.t('pages.account.delete.button'))
        fill_in :password, with: password
        fill_in :message, with: 'delete reason'
        fill_in :email_contact, with: email_contact
        click_on(I18n.t('buttons.delete'))
        alert_have_text(I18n.t('pages.account.delete.success'))

        item = BlackListEmail.find_by(email_contact: email_contact)
        # item = BlackListEmail.find_by(email: user.email)
        expect(item.email).to eq(user.email)
        expect(item.email_contact).to eq(email_contact)
        expect(item.message).to eq('delete reason')

        fsign_in_as(user)
        alert_have_text(I18n.t('api.errors.invalid_credentials'))
      end
    end

    context 'failure' do
      let(:password_invalid) {'invalid password'}
      it "with incorrect login password" do
        click_on(I18n.t('pages.account.delete.button'))
        fill_in :password, with: password_invalid
        click_on(I18n.t('buttons.delete'))
        alert_have_text(I18n.t('api.errors.invalid_password'))
      end
    end
  end
  
end