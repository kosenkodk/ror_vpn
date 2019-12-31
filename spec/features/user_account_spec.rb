require 'rails_helper'

RSpec.describe 'User Account', type: :feature, js: true do
  let(:password) {'password'}
  let(:email) {'email@ex.com'}
  let!(:user) {create(:user, password: password, password_confirmation: password)}

  before(:each) {
    fsign_in_as(user)
    visit '/user/account'
  }

  describe 'Cancel Account' do
    let(:tariff_plan) {create(:tariff_plan)}
    let(:tariff_plan_free) {create(:tariff_plan_free)}
    let(:cancel_account_reason_text) {'too expensive'}
    let(:cancel_reason) {create(:cancel_reason, title: 'reason')}
    let(:cancel_reason2) {create(:cancel_reason, title: 'reason 2')}
    let(:id_of_cancel_account_link) {'cancel_account_link'}

    it 'reset from paid to free plan' do
      user.tariff_plan = tariff_plan
      user.save
      # click_on(I18n.t('pages.account.cancel.title'))
      find('#'+id_of_cancel_account_link).click
      
      fill_in :cancel_account_reason_text, with: cancel_account_reason_text
      # click_on(I18n.t('pages.account.cancel.form.button'))
      click_on(I18n.t('buttons.submit'))

      expect(user.tariff_plan.title).to eq(tariff_plan_free.title)
      expect(user.tariff_plan.price).to eq(tariff_plan_free.price)
      expect(user.cancel_account_reason_text).to eq(cancel_account_reason_text)
    end

    it 'select cancellation reason' do
      user.tariff_plan = tariff_plan
      user.save
      # click_on(I18n.t('pages.account.cancel.title'))
      find('#'+id_of_cancel_account_link).click
      fill_in :cancel_account_reason_text, with: cancel_account_reason_text
      
      # select cancellation reason
      id_of_select_box = 'cancel_account_select_box'
      select(cancel_reason.title, from: id_of_select_box)
      # find('#'+id_of_select_box).select(cancel_reason.title)
      expect(find('#'+id_of_select_box).value.to_i).to eq(cancel_reason.id)
      select(cancel_reason2.title, from: id_of_select_box)
      expect(find('#'+id_of_select_box).value.to_i).to eq(cancel_reason2.id)

      # click_on(I18n.t('pages.account.cancel.form.button'))
      click_on(I18n.t('buttons.submit'))
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
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_email.success'))
        user.email = email_new
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
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_email.errors.email_invalid'))
      end
      it 'with empty email' do
        # click_on(I18n.t('pages.account.change_email.button'))
        click_on(I18n.t('buttons.edit'))
        fill_in :email, with: ''
        fill_in :password, with: password
        click_on(I18n.t('buttons.submit'))
        # expect(find('.alert')).to have_text(I18n.t('api.errors.bad_request'))
        # expect(find('.alert')).to have_text(I18n.t('api.errors.invalid_email'))
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_email.errors.email_invalid'))
      end
      it 'with empty password' do
        # click_on(I18n.t('pages.account.change_email.button'))
        click_on(I18n.t('buttons.edit'))
        fill_in :email, with: ''
        fill_in :password, with: ''
        click_on(I18n.t('buttons.submit'))
        expect(find('.alert')).to have_text(I18n.t('api.errors.invalid_password'))
        # expect(find('.alert')).to have_text(I18n.t('api.errors.unauthorized'))
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
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.success'))
      end
      it 'relogin in background after change password' do
        click_on(I18n.t('pages.account.change_password.button'))
        fill_in :password_old, with: password
        fill_in :password, with: password_new
        fill_in :password_confirmation, with: password_new
        click_on(I18n.t('buttons.submit'))
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.success'))

        fill_in :password_old, with: password_new
        fill_in :password, with: password
        fill_in :password_confirmation, with: password
        click_on(I18n.t('buttons.submit'))
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.success'))
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
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.errors.password_invalid'))
      end
      it 'if new password and confirmation does not match' do
        click_on(I18n.t('pages.account.change_password.button'))
        fill_in :password_old, with: password
        fill_in :password, with: password_invalid
        fill_in :password_confirmation, with: password_new
        click_on(I18n.t('buttons.submit'))
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.errors.passwords_does_not_match'))
      end
      it 'with empty passwords' do
        click_on(I18n.t('pages.account.change_password.button'))
        click_on(I18n.t('buttons.submit'))
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.errors.password_invalid'))
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
        expect(find('.alert')).to have_text(I18n.t('pages.account.delete.success'))
        
        item = BlackListEmail.find_by(email_contact: email_contact)
        # item = BlackListEmail.find_by(email: user.email)
        expect(item.email).to eq(user.email)
        expect(item.email_contact).to eq(email_contact)
        expect(item.message).to eq('delete reason')

        fsign_in_as(user)
        expect(find('.alert')).to have_text(I18n.t('api.errors.invalid_credentials'))
      end
    end

    context 'failure' do
      let(:password_invalid) {'invalid password'}
      it "with incorrect login password" do
        click_on(I18n.t('pages.account.delete.button'))
        fill_in :password, with: password_invalid
        click_on(I18n.t('buttons.delete'))
        expect(find('.alert')).to have_text(I18n.t('api.errors.invalid_password'))
      end
    end
  end
  
end