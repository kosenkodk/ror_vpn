require 'rails_helper'

RSpec.describe HomeController, type: :feature do
  describe 'GET index' do
    it 'renders :index template' do
      visit('/')
      expect(page).to have_content('Vega VPN')
    end
  end
end
