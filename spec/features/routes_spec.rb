require 'rails_helper'

RSpec.describe AuthController, type: :feature, js: true do
    let(:user) {create(:user)}
    before { fsign_in_as(user) }

    it 'visit home page after signin' do
      visit('/')
      is_page_error false
    end
end