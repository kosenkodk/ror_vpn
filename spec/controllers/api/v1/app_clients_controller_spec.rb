require 'rails_helper'

RSpec.describe Api::V1::AppClientsController, type: :controller do
  describe 'index' do
    let!(:client) {create(:app_client)}
    it 'success' do
      get :index
      expect(response.status).to eq(200)
      expect(response_json.keys).to include('clients')
      expect(response_json['clients'][0]).to include(client.as_json)
      expect(response_json['clients'][0].keys).to eq(['id', 'title', 'url'])
    end
  end
end
