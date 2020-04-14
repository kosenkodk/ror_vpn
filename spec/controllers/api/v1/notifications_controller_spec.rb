require 'rails_helper'

RSpec.describe Api::V1::NotificationsController, type: :controller do
  let!(:user) { create(:user) }
  let!(:user2) { create(:user) }
  let!(:user_notification) { create(:message, messageable: user) }
  let!(:user_notification2) { create(:message, messageable: user) }
  let!(:user2_notification) { create(:message, messageable: user2) }

  before { sign_in_as(user) }

  it 'display user\'s notifications' do
    get :index
    expect(response_json['notifications'][0]['text']).to include(user_notification2.text)
    expect(response_json['notifications'].count).to eq(2)
  end

  it 'limit notifications' do
    sign_in_as(user)
    get :index, params: {page: 1, per_page: 2}
    expect(response_json['notifications'].count).to eq(2)
    get :index, params: {page: 1}
    expect(response_json['notifications'].count).to eq(2)
    get :index
    expect(response_json['notifications'].count).to eq(2)
    expect(response_json.keys).to include('is_read_all')
    expect(response_json.keys).to include('page')
    expect(response_json.keys).to include('pages')
    expect(response_json['notifications'][0].keys).to include('is_read')
    expect(response_json['notifications'][0].keys).to include('attachment_url')
    expect(response_json['notifications'][0].keys).to include('attachment_name')
    expect(response_json['notifications'][0].keys).to include('created_at_humanize')
    expect(response_json['notifications'][0].keys).to include('attachmentList')
  end
end
