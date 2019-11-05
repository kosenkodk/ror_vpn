require 'rails_helper'

RSpec.describe 'User Account', type: :feature, js: true do
  let(:password_new) {'password_new'}
  let(:password) {'password'}
  let(:password_invalid) {'password_invalid'}
  let!(:user) {create(:user, password: password, password_confirmation: password)}

  before(:each) {
    fsign_in_as(user)
    visit '/user/account'
  }

  describe I18n.t('pages.account.change_password.button') do
    context 'success' do
      it 'close button of the popup window' do
        expect(page).to have_content('Account')
        click_on(I18n.t('pages.account.change_password.button'))
        expect(page).to have_content(I18n.t('pages.account.change_password.button'))
        expect(page).to have_selector('.modal.fade.show')
        click_on('Close')
        expect(page).not_to have_content('Close')
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
        click_on('Save')
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.success'))
      end
      it 'relogin in background after change password' do
        click_on(I18n.t('pages.account.change_password.button'))
        fill_in :password_old, with: password
        fill_in :password, with: password_new
        fill_in :password_confirmation, with: password_new
        click_on('Save')
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.success'))

        fill_in :password_old, with: password_new
        fill_in :password, with: password
        fill_in :password_confirmation, with: password
        click_on('Save')
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.success'))
      end
    end
    context 'fail' do
      it 'with invalid old password' do
        click_on(I18n.t('pages.account.change_password.button'))
        fill_in :password_old, with: password_invalid
        fill_in :password, with: password_new
        fill_in :password_confirmation, with: password_new
        click_on('Save')
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.errors.password_invalid'))
      end
      it 'if new password and confirmation does not match' do
        click_on(I18n.t('pages.account.change_password.button'))
        fill_in :password_old, with: password
        fill_in :password, with: password_invalid
        fill_in :password_confirmation, with: password_new
        click_on('Save')
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.errors.passwords_does_not_match'))
      end
      it 'with empty passwords' do
        click_on(I18n.t('pages.account.change_password.button'))
        click_on('Save')
        expect(find('.alert')).to have_text(I18n.t('pages.account.change_password.errors.password_invalid'))
      end
    end
  end
end