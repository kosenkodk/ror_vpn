require 'rails_helper'
RSpec.describe ChatChannel, type: :channel do
  let(:user) {create(:user)}
  let(:ticket) {create(:ticket, user: user)}
  let(:room) {"Room#{ticket.id}"}
  let(:ticket_channel) {"ticket_channel#{room}"}

  before do
    # initialize connection with identifiers
    stub_connection current_user: user
  end

  xit "rejects when no room id" do
    subscribe
    expect(subscription).to be_rejected
    expect(subscription).not_to have_streams
  end

  it "subscribes to a stream when room id is provided" do
    subscribe(room: room)

    expect(subscription).to be_confirmed

    # check particular stream by name
    expect(subscription).to have_stream_from('chat:'+ticket_channel)

    # or directly by model if you create streams with `stream_for`
    # expect(subscription).to have_stream_for(Room.find(42))
  end
end
