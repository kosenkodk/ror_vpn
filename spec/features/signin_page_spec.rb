require 'rails_helper'

RSpec.describe AuthController, type: :feature, js: true do

  describe 'GET :signin' do
    before do 
      visit('/login')
    end

    context 'invalid data' do
      it 'render :login template' do
        click_on('Submit')
        expect(find('.alert')).to have_text(I18n.t('signin.invalid_credentials'))
      end
    end

  end
end
