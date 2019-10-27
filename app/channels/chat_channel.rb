class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for 'ticket_channel'
  end
  
  def reply(data)
    message = Message.create(text: data['message_text'], user_id: data['message_user_id'])
    socket = {type: 'message', message: message.as_json(include: :user)}
    ChatChannel.broadcast_to('ticket_channel', socket)
  end

  def load(data)
    # get all messages by ticket id (user and support users)
    ticket_id = data['ticket_id']
    ticket = Ticket.find(ticket_id)
    # TODO: get department user
    # user_id = data['message_user_id']
    # user_ids = data['message_user_ids'] # [1,2,3]
    user_id = ticket.try(:user).try(:id)
    user_ids = [user_id]
    if User.exists?(user_id)
      messages = Message.where(user_id: user_ids).order(created_at: :desc).as_json(include: :user)
    else
      # messages = Message.order(created_at: :desc).as_json(include: :user)
    end
    socket = {type: 'messages', messages: messages}
    ChatChannel.broadcast_to('ticket_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
