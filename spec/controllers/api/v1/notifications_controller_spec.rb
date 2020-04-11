require 'rails_helper'

RSpec.describe Api::V1::NotificationsController, type: :controller do
  let!(:user) { create(:user) }
  let!(:user2) { create(:user) }
  let!(:user_notification) { create(:message, user_id: user.id) }
  let!(:user2_notification) { create(:message, user_id: user2.id) }

  it 'display user\'s invoices' do
    sign_in_as(user)
    get :index
    expect(response_json['notifications'][0]['text']).to include(user_notification.text)
    expect(response_json['notifications'].count).to eq(1)
  end
end
