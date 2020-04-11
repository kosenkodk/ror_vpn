class NotificationsChannel < ApplicationCable::Channel
  include ApplicationHelper

  def subscribed
    stream_for "notification_channel#{params[:room]}"
    stream_for "#{params[:room]}"
  end
  
  def reply(data)
    user_id =  data['user_id'].to_i
    message = Message.create(title: data['title'], text: data['text'], messageable_id: user_id, messageable_type: User) if user_id > 0
    item = message.as_json
    socket = {type: 'message', message: item}
    NotificationsChannel.broadcast_to("notification_channel#{params[:room]}", socket)
  end

  def load(data)
    user_id = data['user_id'].to_i
    messages = Message.where(user_id: user_id).order(created_at: :desc) if user_id > 0
    items = messages.as_json
    socket = {type: 'messages', messages: items}
    NotificationsChannel.broadcast_to("notification_channel#{params[:room]}", socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
