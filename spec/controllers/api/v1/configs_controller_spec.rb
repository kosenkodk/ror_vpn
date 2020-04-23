require 'rails_helper'

RSpec.describe Api::V1::ConfigsController, type: :controller do
  describe 'ovpn configs' do
    let(:user) { create(:user) }
    describe 'logged in users' do
      before { sign_in_as(user) }
      it 'get from vpn server' do
        get :get
        expect(response).to have_http_status(:success)
      end
    end
  end
end
