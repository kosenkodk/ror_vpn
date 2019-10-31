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
  let(:user) {create(:user)}
  let(:ticket) {create(:ticket, user: user)}
  let(:message) {create(:message, ticket_id:ticket.id, user_id:user.id)}
  it "matches with message passed to stream matches" do
    room = 1
    
    message = Message.create(text: 'Hello', user_id: user.id, ticket_id: ticket.id)
    item = message.as_json(include: :user, methods: [:attachment_url, :attachment_name])
    post_params = {message_text: message.text, message_user_id: message.user.id, message_ticket_id: ticket.id}
    expect {
      ActionCable.server.broadcast(
        "ticket_channel#{room}", post_params
      )
    }.to have_broadcasted_to("ticket_channel#{room}").with(
      post_params
      # type:'message'#, message: item
      # include({type:'message', message: message})
    )
  end
  
end