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
      it 'enable 2fa' do
        post :create, params: {password: user.password, code2fa: ''}
        expect(response).to be_successful
        expect(user.is2fa).to eq(true)
      end
      xit 'create mfa session' do
        expect {
          post :create, params: { code2fa: '' }
        }.to change(UserMfaSession, :count).by(1)
      end
    end
  end

  describe '#destroy' do
    context 'success' do
      it 'disable 2fa' do
        delete :destroy
        expect(user.is2fa).to eq(false)
        expect(response_json['notice']).to eq(I18n.t('pages.account.2fa.disable.success'))
      end
    end
  end

end

