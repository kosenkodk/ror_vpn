require 'rails_helper'

RSpec.describe AuthController, type: :feature, js: true do
  let(:user) { create(:user) }

  context 'after signin' do
    before { fsign_in_as(user) }
    
    it 'visit home page' do
      visit('/')
      is_page_error false
    end

    it 'visit contact us' do
      visit('/contact_us')
      expect(page).to have_content(I18n.t('pages.contact_us.subtitle'))
    end
  end
end