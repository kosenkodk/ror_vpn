class Api::V1::PaymentGroupsController < ApplicationController
  def index
    items = PaymentGroup.all
    render json: items.as_json(
      # only: [:id, :title],
      include: :payment_methods
      # except: [:created_at, :updated_at]
    )
  end
end
