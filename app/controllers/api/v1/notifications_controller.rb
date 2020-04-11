class Api::V1::NotificationsController < Api::V1::ApiController
  def index
    messages = Message.where(user_id: current_user.id)
    render json: messages
  end
end
