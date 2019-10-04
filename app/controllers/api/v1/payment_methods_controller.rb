class Api::V1::PaymentMethodsController < ApplicationController
  def index
    items = PaymentMethod.all
    render json: items.as_json(only: [:id, :title, :icons], methods: [ :active_class, :icon_urls])
  end

  def show
    item = PaymentMethod.find(params[:id])
    render json: item #.attributes.merge({icon_url: url_for(item.icon)})
  end

end
