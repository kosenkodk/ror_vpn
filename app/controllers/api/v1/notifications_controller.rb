class Api::V1::NotificationsController < Api::V1::ApiController
  before_action :authorize_access_request!

  def read_all
    is_read_all = Message.read_all
    render json: {notice: '', is_read_all: Message.is_read_all}
  end

  def index
    per_page = params[:per_page].to_i
    page = params[:page].to_i
    
    per_page = per_page > 0 ? per_page : WillPaginate.per_page
    page = page > 0 ? page : 1
    
    messages = Message.where(messageable: current_user).paginate(page: page, per_page: per_page).order(created_at: :desc)
    render json: { 
      notifications: messages,
      pages: messages.try(:total_pages),
      page: messages.try(:current_page),
      is_read_all: Message.is_read_all
    }
  end
end
