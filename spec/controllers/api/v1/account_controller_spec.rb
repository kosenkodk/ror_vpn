require 'rails_helper'

RSpec.describe Api::V1::AccountController, type: :controller do
  let(:user) { create(:user, password: 'password', password_confirmation: 'password') }
  let(:password_new) { 'newpassword' }
  describe 'change password' do
    context 'success' do
      it 'with old, new and confirm passwords' do
        patch :change_password, params: {id: user.id, password_old: 'password', password: password_new, password_confirmation: password_new}
        expect(response_json.values).to eq([I18n.t('pages.account.change_password.success')])
        expect(response_json.keys).to eq(['notice'])
        expect(response).to have_http_status(:success)
        # expect(response_json.keys).to eq(['csrf'])
        # expect(response.cookies[JWTSessions.access_cookie]).to be_present
      end
    end
    context 'failure' do
      it 'without access token'
    end
  end
end
