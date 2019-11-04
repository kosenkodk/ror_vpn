require 'rails_helper'

RSpec.describe 'User Account', type: :feature, js: true do

  let!(:user) {create(:user)}
  before(:each) {
    fsign_in_as(user)
    visit '/user/account'
  }
  describe 'change login password' do
    context 'success' do
      it 'close display popup windows' do
        expect(page).to have_content('Account')

        click_on('Change login password')
        expect(page).to have_content('Change login password')
        expect(page).to have_selector('.modal.fade.show')
        click_on('Close')
        expect(page).not_to have_content('Close')
        # expect(page).to have_selector('.modal.fade')
      end
    end
    context 'fail' do
    end
  end
end