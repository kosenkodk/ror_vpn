require "rails_helper"

# RSpec.describe Broadcaster do
RSpec.describe ChatChannel do
  it "matches with stream name" do
    expect {
      ActionCable.server.broadcast(
        "notifications", text: 'Hello!'
      )
    }.to have_broadcasted_to("notifications")
  end
  it "matches with message" do
    expect {
      ActionCable.server.broadcast(
        "notifications", text: 'Hello!'
      )
    }.to have_broadcasted_to("notifications").with(text: 'Hello!')
  end
  it "matches with message passed to stream matches" do
    expect {
      ActionCable.server.broadcast(
        "notifications", text: 'Hello!', user_id: 12
      )
    }.to have_broadcasted_to("notifications").with(a_hash_including(text: 'Hello!'))
  end
end