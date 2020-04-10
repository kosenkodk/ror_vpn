class Api::V1::PaymentMethodsController < Api::V1::ApiController
  before_action :authorize_access_request!, only: [:create, :destroy]

  def for_signup
    items = PaymentMethod.for_signup
    render json: items.as_json(only: [:id, :pay_id, :title, :icons], methods: [ :active_class, :icon_urls])
  end

  def index
    items = PaymentMethod.where(is_for_signup: false)
    render json: items.as_json(only: [:id, :pay_id, :title, :icons], methods: [ :active_class, :icon_urls])
  end

  def show
    item = PaymentMethod.find(params[:id].to_i)
    render json: item #.attributes.merge({icon_url: url_for(item.icon)})
  end

  def create
    title = params[:card_no].present? ? "Visa (... #{params[:card_no].try(:last,4)})" : params[:title]
    item = PaymentMethod.create!(title: title, user_id: current_user.id)
    if params[:country_code].present?
      country = Country.find_by_code(params[:country_code]) 
      current_user.update(country: country) if country
    end
    if item
      render json: { payment_method: item, notice: I18n.t('pages.payments.payment_methods.add.success') }
      return
    end
    render json: { error: I18n.t('pages.payments.payment_methods.add.error') }
  end

  def destroy
    id = params[:id].to_i
    if PaymentMethod.exists?(id)
      if PaymentMethod.find(id).destroy!
        render json: { notice: I18n.t('pages.payments.payment_methods.delete.success') }
        return
      else
        render json: { error: I18n.t('pages.payments.payment_methods.delete.error') }, status: 422
        return
      end
    else
      render json: { error: I18n.t('pages.payments.payment_methods.delete.not_found') }, status: 404
    end
  end

  private
  def payment_method_params
    params.permit(:title)
  end

end
