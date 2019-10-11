require 'rails_helper'

RSpec.describe ErrorsController, type: :feature, js: true do
  describe 'Get Coming Soon Page' do
    it 'renders coming_soon template' do
      visit('/coming_soon')
      expect(page).to have_content('Coming Soon')
      expect(page).to have_content('Our developers are currently working hard building this page')
    end
  end
end
