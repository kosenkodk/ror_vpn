class Api::V1::InvoicesController < Api::V1::ApiController
  before_action :authorize_access_request!

  def show
    item = Invoice.find(params[:id]).where(user_id: current_user)
    render json: item
  end

  def index
    items = get_invoices
    render json: items
  end

  def create
    item = Invoice.create!(invoice_params)
    render json: item, status: :created, location: api_v1_invoice_url(item)
  end

  def update
    invoice_details = params[:invoice][:invoice_details]
    if invoice_details.present?
      item = Invoice.where(user_id: current_user.id).last
      item.update(details_from: invoice_details)
      invoices = get_invoices
      # add name and address (customize all invoices or last invoice ?)
      # invoices.each do |item|
      #   item.update(details_from: invoice_details)
      # end
      render json: {invoices: invoices}
      return
    else
      item = Invoice.where(user_id: current_user.id).find(params[:id])
      item.update!(invoice_params)
      render json: item
      return
    end
  end

  private
  def get_invoices
    return Invoice.where(user_id: current_user).reverse
  end

  def invoice_params
    params.require(:invoice).permit(:id, :no, :invoice_type, :status, :amount, :currency, :user_id, :details_from)
  end
end
