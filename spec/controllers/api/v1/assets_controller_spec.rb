require 'rails_helper'

RSpec.describe Api::V1::AssetsController, type: :controller do
  describe 'assets' do
    let(:user) { create(:user) }
    before { sign_in_as(user) }

    let(:ticket) { create(:ticket, user: user) }

    it 'view' do
      path_to_file = Rails.root.join('app','assets', 'images', 'logo.png')
      ticket.attachment.attach(io: File.open(path_to_file), filename: 'asset1')
      # fixture_file_upload(path_to_file, 'image/png')
      get :show, params: { id: ticket.attachment.id }
      expect(response.status).to eq(200)
      expect(response_json.keys).to include('url')
    end
  end
end
