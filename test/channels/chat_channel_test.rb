
require "test_helper"
 
class ChatChannelTest < ActionCable::Channel::TestCase
  test "subscribes and stream for room" do
    stub_connection current_user: users(:user)

    # Simulate a subscription creation by calling `subscribe`
    
    subscribe  channel: 'ChatChannel', room: "15"
 
    # You can access the Channel object via `subscription` in tests
    assert subscription.confirmed?
    assert_has_stream "ticket_channel15"
  end
end
