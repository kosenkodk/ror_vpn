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
        # GoogleAuthenticatorRails::generate_password("test", counter)

        post :create, params: {password: user.password, code2fa: ''}
        expect(response).to be_successful

        expect(response_json.values).to include(I18n.t('pages.account.2fa.enable.success'))
        expect(response_json['notice']).to eq(I18n.t('pages.account.2fa.enable.success'))
        user.reload
        expect(user.is2fa).to eq(true)
      end
      xit 'create mfa session' do
        expect {
          post :create, params: { code2fa: '' }
        }.to change(UserMfaSession, :count).by(1)
      end
    end

    context 'failure' do
      it 'with wrong or empty qr code' do
        post :create, params: {password: user.password, code2fa: ''}
        expect(response).to be_successful
        expect(response_json.keys).to include('error')
        expect(response_json.values).to include(I18n.t('pages.account.2fa.enable.error'))
        expect(response_json['error']).to eq(I18n.t('pages.account.2fa.enable.error'))
        expect(user.is2fa).to eq(false)
      end
      it 'with empty password' do
        post :create, params: {password: '', code2fa: ''}
        expect(response_json['error']).to eq(I18n.t('pages.account.2fa.enable.error'))
      end
    end
  end

  describe '#destroy' do
    context 'success' do
      it 'disable 2fa' do
        delete :destroy, params: { id: user.id }
        expect(user.is2fa).to eq(false)
        expect(response_json['notice']).to eq(I18n.t('pages.account.2fa.disable.success'))
      end
    end
  end

end

