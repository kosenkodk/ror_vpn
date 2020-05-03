require 'rails_helper'

RSpec.describe Api::V1::ConfigsController, type: :controller do
  describe 'ovpn configs' do
    let(:user) { create(:user) }
    let(:config) { create(:config) }
    describe 'logged in users' do
      before { sign_in_as(user) }
      it 'get from vpn server' do
        get :show, params: {id: config.id}
        expect(response).to have_http_status(:success)
        vpn_user = VpnUser.find_by(vpn_login: user.email)
        expect(vpn_user.vpn_login).to eq(user.email)
        expect(vpn_user.vpn_enabled).to eq(true)
      end
    end
  end
end
