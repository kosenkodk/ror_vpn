class Api::V1::PaymentGroupsController < ApplicationController
  def index
    items = PaymentGroup.all
    render json: items
  end
end
