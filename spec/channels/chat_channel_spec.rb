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
    stub_connection #channel: chat_channel
  end

  xit "rejects when no room id" do
    subscribe
    expect(subscription).to be_rejected
    expect(subscription).not_to have_streams
  end

  it "subscribes to a stream when room id is provided" do
    # subscribe room: room
    subscribe(channel: chat_channel, room: room)
    expect(subscription).to be_confirmed

    # check particular stream by name
    expect(subscription).to have_stream_from("chat:#{ticket_channel}")

    # or directly by model if you create streams with `stream_for`
    # expect(subscription).to have_stream_for(Room.find(42))
  end

  it "send reply from ticket page" do
    subscribe(channel: chat_channel, room: room)
    
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("chat:#{ticket_channel}")
    
    item = message.as_json#(only: [:text], include: :user, methods: [:attachment_url, :attachment_name])
    request_params = {message_text: message.text, message_user_id: message.user_id, message_ticket_id: message.ticket_id}
    # perform :reply, request_params
    # expect(transmissions.last).to eq({'message': request_params}) # transmissions is always nil
    expect {
      perform :reply, request_params
    }.to have_broadcasted_to("chat:#{ticket_channel}").with({type: 'message', message: item})
  end

  it "subscribe and speak" do
    subscribe room: room
    # perform :speak, message: 'message'
    # expect(transmissions.last).to eq('text' => 'message') # transmissions is always nil
    expect {
      # perform :ticket_reply, message: 'Cool!' 
      perform :speak, message: 'Cool!'
    }.to have_broadcasted_to("chat:#{room}").with(text: 'Cool!')
  end
end

RSpec.describe ApplicationCable::Connection, :type => :channel do
  let(:user) { create(:user)}
  let(:ticket) { create(:ticket, user:user)}
  xit "successfully connects" do
    connection.current_user = user
    connect "/cable?room=#{ticket.id}"
    expect(connection.current_user).to eq ticket.user
    # expect(connection.access_token).to eq access_token
  end
  xit "rejects connection" do
    expect { connect "/cable" }.to have_rejected_connection
  end
end