require 'rails_helper'

RSpec.describe AuthController, type: :feature do
  describe 'GET :login' do
    it 'render :login template' do
      visit(login_path)
      expect(find('.login')).to have_content('Log in to your account')
      expect(find('.login')).to have_content("Don't have an account?")
      expect(find('.login')).to have_content('Sign Up')
      expect(find('.login')).to have_content('Email address')
      expect(find('.login')).to have_content('Password')
      expect(find('.login')).to have_content('Log in')
      expect(find('.login')).to have_content('Having trouble logging in?')
      expect(page).not_to have_css('footer')
    end
  end
end