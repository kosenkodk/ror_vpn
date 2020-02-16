class Api::V1::SignupController < Api::V1::ApiController

  def create
    # endpoint for web client — we’ll be renewing a new access with the old expired one
    params_total = user_params_all
    user = User.new params_total.except(:payment_method_id, :tariff_plan_id)

    # payment method
    if PaymentMethod.exists?(params[:payment_method_id]) && params[:payment_method_id].present?
      user.payment_method = PaymentMethod.find(params[:payment_method_id])
    end

    # tariff plan
    if params[:tariff_plan_id].present?
      plan = params[:tariff_plan_id].to_i
      # if params[:tariff_plan_id].is_a? String
      #   plan = params[:tariff_plan_id]
      # elsif params[:tariff_plan_id].is_a? Integer
      #   plan = params[:tariff_plan_id]
      # else
      #   plan = params[:tariff_plan_id].permit(:tariff_plan_id)[:tariff_plan_id]
      # end
      if TariffPlan.exists?(plan)
        user.tariff_plan = TariffPlan.find(plan)
      end
    end

    if BlackListEmail.where(email: user.email).count > 0
      render json: { error: I18n.t('api.errors.deleted_account'), status: :error}
      return
    end

    if user.save
      # refer friend
      if params[:rid].present?
        if User.exists?(params[:rid])
          referrer = User.find(params[:rid])
          user.referrer_id = referrer.id #params[:rid]
          user.save
          # user.update(referrer_id, referrer.id)
          # referrer.referred_friends << user # add 
          # referrer.save
          
          # todo: after buy paid subscription add extra month for free
          # referrer.update(subscription_date_expiration, 1.month.after) # if user select 1mo plan
          # user.update(subscription_date_expiration, 1.month.after) # if user select 1mo plan 
          
          # referrer.update(subscription_date_expiration, 45.days.after) # if user select 3mo/quartely plan
          # user.update(subscription_date_expiration, 45.days.after) # if user select 3mo/quartely plan
          
          # referrer.update(subscription_date_expiration, 2.months.after) # if user select year plan
          # user.update(subscription_date_expiration, 2.months.after) # if user select year plan
        end
        # todo: add message to notifications
      end

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
    params.permit(:email, :password, :password_confirmation, :payment_method_id, :tariff_plan_id)
  end

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end
end
