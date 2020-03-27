class Api::V1::InvoicesController < Api::V1::ApiController
  before_action :authorize_access_request!

  def show
    item = Invoice.find(params[:id]).where(user_id: current_user)
    render json: item
  end

  def index
    items = Invoice.where(user_id: current_user)
    render json: items
  end

  def create
    item = Invoice.create!(invoice_params)
    render json: item, status: :created, location: api_v1_invoice_url(item)
  end

  private
  def invoice_params
    params.require(:invoice).permit(:no, :type, :status, :amount, :currency, :user_id)
  end
end
