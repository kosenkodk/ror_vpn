require 'rails_helper'

RSpec.describe ErrorsController, type: :feature do
  describe 'Get Coming Soon Page' do
    it 'renders coming_soon template' do
      # visit('/204')
      visit(coming_soon_path)
      expect(page).to have_content('Coming Soon')
      expect(page).to have_content('Our developers are currently working hard building this page')
    end
  end
end
