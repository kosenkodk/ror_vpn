require 'rails_helper'

RSpec.describe AuthController, type: :feature, js: true do

  describe 'GET :signin' do
    
    before do 
      visit('/signin')
    end

    context 'error' do
      it 'with invalid credentials' do
        click_on('Submit')
        expect(find('.alert')).to have_text(I18n.t('signin.invalid_credentials'))
      end
    end

    context 'success' do
      it 'with valid credentials'
    end
  end
end
