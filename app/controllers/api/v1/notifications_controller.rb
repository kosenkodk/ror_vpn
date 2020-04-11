class Api::V1::NotificationsController < Api::V1::ApiController
  before_action :authorize_access_request!

  def index
    messages = Message.where(user_id: current_user.id)
    render json: {notifications: messages}
  end
end
