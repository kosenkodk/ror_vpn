class Api::V1::SignupController < Api::V1::ApiController
  ALL_KEYS = [ :email, :password, :password_confirmation, :payment_method_id, :tariff_plan_id ].freeze
  KEYS = [ :email, :password, :password_confirmation ].freeze

  def create
    # endpoint for web client — we’ll be renewing a new access with the old expired one
    # user = User.new(user_params_all)
    user = User.new(user_params)
    if PaymentMethod.exists?(params[:payment_method_id])
      user.payment_method = PaymentMethod.find(params[:payment_method_id])
    end
    if TariffPlan.exists?(params[:tariff_plan_id])
      user.tariff_plan = TariffPlan.find(params[:tariff_plan_id])
    end
    # user.payment_method_id = params[:payment_method_id] if PaymentMethod.exists?(params[:payment_method_id])
    # user.tariff_plan_id = params[:tariff_plan_id] if TariffPlan.exists?(params[:tariff_plan_id])
    # user.payment_method = params[:payment_method_id].present? && params[:payment_method_id].to_i > 0 ? PaymentMethod.find(params[:payment_method_id]) : PaymentMethod.last
    # user.tariff_plan = params[:tariff_plan_id].present? && params[:tariff_plan_id].to_i > 0 ? TariffPlan.find(params[:tariff_plan_id]) : TariffPlan.last
    
    if BlackListEmail.where(email: user.email).count > 0
      render json: { error: I18n.t('api.errors.deleted_account'), status: :error}
      return
    end

    if user.save
      begin
        UserMailer.signup(user).deliver_now
      rescue => exception
        
      end
      payload  = { user_id: user.id, aud: [user.role] }
      session = JWTSessions::Session.new(payload: payload,
                                         refresh_by_access_allowed: true,
                                         namespace: "user_#{user.id}")
      tokens = session.login
      response.set_cookie(JWTSessions.access_cookie, value: tokens[:access], httponly: true, secure: Rails.env.production?)
      render json: { csrf: tokens[:csrf] }
    else
      render json: { error: user.errors.full_messages.join(' '), status: :unprocessable_entity}
    end
  end

  private

  def user_params_all
    params.tap { |p| p.require(ALL_KEYS) }.permit(*ALL_KEYS)
  end

  def user_params
    params.tap { |p| p.require(KEYS) }.permit(*KEYS)
  end
end
