class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "ticket_channel#{params[:room]}"
    stream_for "ticket_channel#{params[:room]}"
    stream_for "#{params[:room]}"
  end

  def speak(data)
    broadcast_to params[:room], text: data["message"]
  end

  def echo(data)
    socket = {text: data['message']}
    ChatChannel.broadcast_to("#{params[:room]}", 
      socket,
      # text: data['message'],
    )
  end
  
  def ticket_reply(data)
    # message = Message.create(text: data['message_text'], user_id: data['message_user_id'], ticket_id: data['message_ticket_id'])
    socket = {type: 'message', message: data['message']}
    ChatChannel.broadcast_to("ticket_channel#{params[:room]}", socket)
  end

  def reply(data)
    if Ticket.exists?(data['message_ticket_id'])
      # message = Message.create(text: data['message_text']) if data['message_text']
      # message.update(user_id: data['message_user_id']) if data['message_user_id']
      # message.update(ticket_id: data['message_ticket_id'])
      message = Message.create(text: data['message_text'], ticket_id: data['message_ticket_id'], user_id: data['message_user_id']) if data['message_user_id']
      ticket = Ticket.find(data['message_ticket_id'])
      ticket.messages << message if message
    else
    end

    item = message.as_json
    socket = {type: 'message', message: item}
    ChatChannel.broadcast_to("ticket_channel#{params[:room]}", socket)
  end

  def load(data)
    ticket_id = data['ticket_id']
    messages = Message.where(ticket_id: ticket_id).order(created_at: :desc) if ticket_id.present?
    items = messages.as_json
    socket = {type: 'messages', messages: items}
    ChatChannel.broadcast_to("ticket_channel#{params[:room]}", socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
