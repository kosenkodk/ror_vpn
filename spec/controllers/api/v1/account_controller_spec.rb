require 'rails_helper'

RSpec.describe Api::V1::AccountController, type: :controller do
  let(:user) { create(:user, password: 'password') }
  let(:password_new) { 'newpassword' }
  describe 'change password' do
    context 'success' do
      it 'with old, new and confirm passwords' do
        patch :change_password, params: {password_old: 'password', password_new: password_new, password_confirmation: password_new}
        expect(response).to have_http_status(:success)
      end
    end
    context 'failure' do
      it 'without access token'
    end
  end
end
