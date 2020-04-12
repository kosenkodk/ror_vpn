class Api::V1::NotificationsController < Api::V1::ApiController
  before_action :authorize_access_request!

  def index
    limit = params[:limit].to_i
    messages = Message.where(messageable: current_user).paginate(page: params[:page] || 1, per_page: (limit > 0) ? limit : params[:per_page]).order(created_at: :desc)
    render json: {notifications: messages}
  end
end
