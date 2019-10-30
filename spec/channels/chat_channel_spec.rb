require 'rails_helper'

RSpec.describe ChatChannel, type: :channel do
  let!(:user) {create(:user)}
  let!(:ticket) {create(:ticket, user: user)}
  let!(:message) {create(:message, user: user, ticket_id: ticket.id)}
  let(:room) {"Room#{ticket.id}"}
  let(:ticket_channel) {"ticket_channel#{room}"}
  let(:chat_channel) {"ChatChannel"}
  
  before do
    # initialize connection with identifiers
    # stub_connection current_user: user
    stub_connection channel: chat_channel
  end

  xit "rejects when no room id" do
    subscribe
    expect(subscription).to be_rejected
    expect(subscription).not_to have_streams
  end

  it "subscribes to a stream when room id is provided" do
    # subscribe room: room
    # subscribe(channel: chat_channel)
    subscribe(channel: chat_channel, room: room)
    # subscribe(channel: ticket_channel, room: room)

    expect(subscription).to be_confirmed

    # check particular stream by name
    expect(subscription).to have_stream_from('chat:'+ticket_channel)

    # or directly by model if you create streams with `stream_for`
    # expect(subscription).to have_stream_for(Room.find(42))
    
    data = {message_text: message.text, message_user_id: message.user_id, message_ticket_id: message.ticket_id}
    # perform :reply, {message: data}
    # expect(transmissions.last).to eq({'message': data})
    perform :reply, data
    expect(transmissions.last).to eq({'message': data})
  end

  it "successfully subscribes" do
    subscribe room:1
    perform :echo, foo: 'bar'
    expect(transmissions.last).to eq('foo' => 'bar')
  end
end

RSpec.describe ApplicationCable::Connection, :type => :channel do
  it "successfully connects" do
    # connect "/cable?current_user=#{create(:user)}"
    # expect(connection.current_user).to eq "323"
  end
end