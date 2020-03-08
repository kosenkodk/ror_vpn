class Api::V1::PaymentMethodsController < Api::V1::ApiController

  def for_signup
    items = PaymentMethod.for_signup
    render json: items.as_json(only: [:id, :title, :icons], methods: [ :active_class, :icon_urls])
  end

  def index
    items = PaymentMethod.all
    render json: items.as_json(only: [:id, :title, :icons], methods: [ :active_class, :icon_urls])
  end

  def show
    item = PaymentMethod.find(params[:id])
    render json: item #.attributes.merge({icon_url: url_for(item.icon)})
  end

  def groups
    items = PaymentGroup.all
    render json: items
  end

end
