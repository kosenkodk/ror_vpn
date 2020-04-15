module Notification
  include ApplicationHelper
  def create_notification(params)
    send_notification(params)
    "send"
  end
end

class Notifier
  # include Notification
  # def message(params)
  #   create_notification(params)
  # end
  
  def self.message(title: '', text: '', user_id: '', url: '')
    message = Message.create(title: title, text: text, messageable_id: user_id, messageable_type: User, url: url) if user_id > 0
    puts "notifier message #{message.title} #{message.messageable_id}"
    socket = {type: 'message', message: message.as_json}
    ActionCable.server.broadcast "notifications:notifications_channel#{user_id}", socket
    "send"
  end

  def self.message_only(title: '', text: '', user_id: '', url: '')
    message = Message.new(title: title, text: text, messageable_id: user_id, messageable_type: User, url: url) if user_id > 0
    socket = {type: 'message', message: message.as_json}
    ActionCable.server.broadcast "notifications:notifications_channel#{user_id}", socket
    "message_only"
  end

end