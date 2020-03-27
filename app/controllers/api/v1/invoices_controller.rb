class Api::V1::InvoicesController < Api::V1::ApiController
  before_action :authorize_access_request!

  def index
    items = Invoice.all
    render items
  end

  def create
    item = Invoice.create!(invoice_params)
    render json: item
  end

  private
  def invoice_params
    params.require(:invoice).permit(:no, :type, :status, :amount, :currency, :user_id)
  end
end
