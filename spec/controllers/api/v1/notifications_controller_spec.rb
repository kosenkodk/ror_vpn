require 'rails_helper'

RSpec.describe Api::V1::NotificationsController, type: :controller do
  let!(:user) { create(:user) }
  let!(:notification) { create(:message, user_id: user.id) }

  it 'display user\'s invoices' do
    get :index
    expect(response_json.count).to eq(1)
  end
end
