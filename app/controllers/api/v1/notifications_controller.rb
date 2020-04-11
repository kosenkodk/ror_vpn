class Api::V1::NotificationsController < Api::V1::ApiController
  before_action :authorize_access_request!

  def index
    limit = params[:limit].to_i
    messages = limit > 0 ? Message.where(user_id: current_user.id).limit(limit) : Message.where(user_id: current_user.id)
    messages.order(created_at: :desc)
    render json: {notifications: messages}
  end
end
