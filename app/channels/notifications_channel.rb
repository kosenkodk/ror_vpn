class NotificationsChannel < ApplicationCable::Channel
  include ApplicationHelper

  def subscribed
    stream_for "notification_channel#{params[:room]}"
    stream_for "#{params[:room]}"
  end
  
  def reply(data)
    message = Message.create(text: data['message_text'], user_id: data['message_user_id']) if data['message_user_id']
    item = message.as_json
    socket = {type: 'message', message: item}
    NotificationsChannel.broadcast_to("notification_channel#{params[:room]}", socket)
  end

  def load(data)
    user_id = data['user_id']
    messages = Message.where(user_id: user_id).order(created_at: :desc) if user_id.present?
    items = messages.as_json
    socket = {type: 'messages', messages: items}
    NotificationsChannel.broadcast_to("notification_channel#{params[:room]}", socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
