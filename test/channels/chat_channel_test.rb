
require "test_helper"
 
class ChatChannelTest < ActionCable::Channel::TestCase
  include ActionCable::TestHelper
  
  # def setup
  #   @room = Room.find 1

  #   stub_connection(user: users[:user])
  #   subscribe room_number: room.id
  # end

  def test_speak
    room = 1
    subscribe room: room #room_id: rooms(:chat).id
  
    assert_broadcast_on(
      room, # rooms(:chat), 
      text: "Hello, Rails!"
    ) do
      perform :speak, message: "Hello, Rails!"
    end
  end  
  
  def test_echo_broadcasting
    room = 1
    subscribe room: room
  
    assert_broadcast_on(room, {text: "Hello, Rails!"}) do
      perform :echo, {message: "Hello, Rails!"}
    end
    # perform :echo, message: "Hello, Rails!"
    # assert_equal "Hello, Rails!", transmissions.last["text"] # transmissions.last is always nil
  end

  def test_ticket_reply
    @chat_channel = 'ChatChannel' #'ticket_channel' #'ChatChannel'
    @ticket_channel = 'ticket_channel'
    @room = 1

    # stub_connection #(user: users[:user]) # stub_connection is optional
    subscribe room: @room #, channel: @chat_channel # channel is optional
    assert subscription.confirmed?

    request_params = {message: "reply"}
    response = { type: 'message', message: 'reply' }
    assert_broadcast_on("chat:#{@ticket_channel}#{@room}", response) do
      perform :ticket_reply, request_params
    end
  end

  test "subscribes and stream for room" do
    @chat_channel = 'ChatChannel' #'ticket_channel' #'ChatChannel'
    @ticket_channel = 'ticket_channel'
    @room = 1

    stub_connection #channel: chat_channel #current_user: users(:user)
    # Simulate a subscription creation by calling `subscribe`
    
    # subscribe channel: @chat_channel, room: @room
    subscribe room: @room
    # You can access the Channel object via `subscription` in tests
    assert subscription.confirmed?
    # assert_has_stream "#{@ticket_channel}#{@room}"
    assert_has_stream "chat:#{@room}"
  end
end



# assert_broadcast_on(ChatChannel.broadcasting_for(room), message_text: "Hi!") do
#   ChatChannel.perform_now(room, "Hi!")
# end


## app/jobs/chat_relay_job.rb
# class ChatRelayJob < ApplicationJob
#   def perform_later(room, message)
#     ChatChannel.broadcast_to room, text: message
#   end
# end
 
# test/jobs/chat_relay_job_test.rb
# require 'test_helper'
 
# class ChatRelayJobTest < ActiveJob::TestCase
# class ChatChannelTest < ActiveJob::TestCase
#   include ActionCable::TestHelper
 
#   test "broadcast message to room" do
#     # room = rooms(:all)
 
#     assert_broadcast_on(ChatChannel.broadcasting_for(room), text: "Hi!") do
#       # ChatRelayJob.perform_now(room, "Hi!")
#       # socket = {type: 'message', message: item}
#       ChatChannel.broadcast_to("ticket_channel#{room}", socket)
#     end
#   end
# end