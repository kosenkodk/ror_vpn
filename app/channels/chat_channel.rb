class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for 'ticket_channel'
  end
  
  def reply(data)
    # user = User.find(data['message_user_id'])
    message = Message.create(text: data['message_text'], user_id: data['message_user_id'])
    socket = {type: 'message', message: message}
    ChatChannel.broadcast_to('ticket_channel', socket)
  end

  def load
    messages = Message.order(created_at: :desc).as_json(include: :user)
    socket = {type: 'messages', messages: messages}
    ChatChannel.broadcast_to('ticket_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
