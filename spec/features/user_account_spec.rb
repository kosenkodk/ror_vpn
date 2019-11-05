require 'rails_helper'

RSpec.describe 'User Account', type: :feature, js: true do

  let!(:user) {create(:user, password: 'password', password_confirmation: 'password')}

  before(:each) {
    fsign_in_as(user)
    visit '/user/account'
  }

  describe 'change login password' do
    context 'success' do
      it 'close button of the popup window' do
        expect(page).to have_content('Account')
        click_on('Change login password')
        expect(page).to have_content('Change login password')
        expect(page).to have_selector('.modal.fade.show')
        click_on('Close')
        expect(page).not_to have_content('Close')
        # expect(page).to have_selector('.modal.fade')
      end
      it 'click on save button of the popup window' do
        expect(page).to have_content('Account')
        click_on('Change login password')
        fill_in :password_old, with: 'password'
        fill_in :password, with: 'password2'
        fill_in :password_confirmation, with: 'password2'
        expect(page).to have_content('Change login password')
        expect(page).to have_selector('.modal.fade.show')
        click_on('Save')
        expect(page).to have_content(I18n.t('pages.account.change_password.success'))
      end
      it 'logout because it can not handle 401 error because it clear password token and recreate a session after change password'
    end
    context 'fail' do
      it 'with invalid old password'
      it 'if new and confirmation passwords aren\'t match'
      it 'with empty passwords'
    end
  end
end