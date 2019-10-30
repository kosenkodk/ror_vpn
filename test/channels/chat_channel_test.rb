
require "test_helper"
 
class ChatChannelTest < ActionCable::Channel::TestCase
  test "subscribes and stream for room" do
    # stub_connection #current_user: users(:user)

    # Simulate a subscription creation by calling `subscribe`
    channel = 'ticket_channel' #'ChatChannel'
    room = '15'
    subscribe channel: channel, room: room
 
    # You can access the Channel object via `subscription` in tests
    assert subscription.confirmed?
    assert_has_stream "#{channel}#{room}"
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