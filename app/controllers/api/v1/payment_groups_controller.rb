class Api::V1::PaymentGroupsController < ApplicationController
  def index
    items = PaymentGroup.all
    render json: items.as_json(
      # only: [:id, :title, :icons],
      include: :payment_methods,
      methods: [ :icon_urls],
      # except: [:created_at, :updated_at]
    )
  end
end
