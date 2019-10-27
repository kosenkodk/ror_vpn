class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for 'ticket_channel'
  end
  
  def reply(data)
    message = Message.create(text: data['message_text'], user: data['message_user_id'])
    socket = {type:'message', message: message, text: message.text, user: message.user}
    ChatChannel.broadcast_to('ticket_channel', socket)
  end

  def load
    messages = Messages.all
    socket = {messages: messages, type:'messages'}
    ChatChannel.broadcast_to('ticket_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
