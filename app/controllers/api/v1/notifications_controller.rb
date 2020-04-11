class Api::V1::NotificationsController < Api::V1::ApiController
  before_action :authorize_access_request!

  def index
    limit = params[:limit].to_i
    messages = limit > 0 ? Message.where(messageable: current_user).limit(limit) : Message.where(messageable: current_user)
    messages.order(created_at: :desc)
    render json: {notifications: messages}
  end
end
