require 'rails_helper'

RSpec.describe Api::V1::PasswordResetsController, type: :controller do
  let(:user) { create(:user) }

  describe "POST #create" do
    it do
      expect(UserMailer).to receive(:reset_password).once.and_return(double(deliver_now: true))
      post :create, params: { email: user.email }
      expect(response).to be_successful
    end

    it do
      expect(UserMailer).to_not receive(:reset_password)
      post :create, params: { email: 'non@existent.com' }
      expect(response).to be_successful
    end
  end

  describe "GET #edit" do
    before do
      user.generate_password_token!
    end
    
    it do
      get :edit, params: { token: user.reset_password_token }
      expect(response).to be_successful
    end

    it 'returns unauthorized for expired tokens' do
      user.update({ reset_password_token_expires_at: 1.minutes.ago })
      get :edit, params: { token: user.reset_password_token }
      expect(response).to have_http_status(401)
    end

    it 'reset password link is valid during 2 hours' do
      user.update({ reset_password_token_expires_at: 2.hours.ago })
      get :edit, params: { token: user.reset_password_token }
      expect(response).to have_http_status(401)
    end

    it 'returns unauthorized for invalid expirations' do
      user.update({ reset_password_token_expires_at: nil })
      get :edit, params: { token: user.reset_password_token }
      expect(response).to have_http_status(401)
    end

    it 'returns not_found for invalid params' do
      get :edit, params: { token: 1 }
      expect(response).to have_http_status(:not_found)
    end
    
  end

  describe "PATCH #update" do
    let(:new_password) { 'new_password' }
    before do
      user.generate_password_token!
    end

    it do
      patch :update, params: { token: user.reset_password_token, password: new_password, password_confirmation: new_password }
      expect(response).to be_successful
    end

    it 'returns 422 if passwords do not match' do
      patch :update, params: { token: user.reset_password_token, password: new_password, password_confirmation: 1 }
      expect(response).to have_http_status(422)
    end

    it 'returns 400 if param is missing' do
      patch :update, params: { token: user.reset_password_token, password: new_password }
      expect(response).to have_http_status(400)
    end

  end

end
