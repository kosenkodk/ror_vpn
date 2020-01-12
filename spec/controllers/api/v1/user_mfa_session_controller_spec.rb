require 'rails_helper'

RSpec.describe Api::V1::UserMfaSessionController, type: :controller do
  let(:user) {create(:user)}
  before { sign_in_as(user) }

  describe 'GET #new' do
    it 'get qr code url' do
      get :new
      expect(response_json.keys).to eq(['notice', 'qr_code_url'])
      expect(response_json['qr_code_url']).to eq(user.google_qr_uri)
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'success' do
      it '' do
        expect {
          post :create, params: { code2fa: '' }
        }.to change(UserMfaSession, :count).by(1)
      end
    end
  end

end

