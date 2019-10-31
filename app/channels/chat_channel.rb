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
    socket = {foo: 'bar'} # data
    ChatChannel.broadcast_to("#{params[:room]}", data)
  end
  
  def reply(data)
    message = Message.create(text: data['message_text'], user_id: data['message_user_id'], ticket_id: data['message_ticket_id'])
    # item = message.to_json# rescue {}
    item = message.as_json(include: :user, methods: [:attachment_url, :attachment_name])
    socket = {type: 'message', message: item}
    ChatChannel.broadcast_to("ticket_channel#{params[:room]}", socket)
  end

  def load(data)
    ticket_id = data['ticket_id']
    messages = Message.where(ticket_id: ticket_id).order(created_at: :desc) if ticket_id.present?
    # items = messages.to_json# rescue {}
    items = messages.as_json(include: :user, methods: [:attachment_url, :attachment_name])
    socket = {type: 'messages', messages: items }
    ChatChannel.broadcast_to("ticket_channel#{params[:room]}", socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
