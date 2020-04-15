module Notification
  include ApplicationHelper
  def create_notification(params)
    send_notification(params)
    "send"
  end
end

class Notifier
  include Notification
  def message(params)
    create_notification(params)
  end
end