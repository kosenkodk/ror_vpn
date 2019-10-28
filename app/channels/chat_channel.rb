class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for "ticket_channel#{params[:room]}"
  end
  
  def reply(data)
    message = Message.create(text: data['message_text'], user_id: data['message_user_id'], ticket_id: data['message_ticket_id'])
    socket = {type: 'message', message: message.as_json(include: :user)}
    ChatChannel.broadcast_to("ticket_channel#{params[:room]}", socket)
  end

  def load(data)
    ticket_id = data['ticket_id']
    messages = Message.where(ticket_id: ticket_id).order(created_at: :desc).as_json(
      include: :user, methods: [:attachment_url, :attachment_name]
    )
    
    # messages = Message.order(created_at: :desc).as_json(include: :user)
    socket = {type: 'messages', messages: messages}
    ChatChannel.broadcast_to("ticket_channel#{params[:room]}", socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
