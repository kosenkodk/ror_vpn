class Api::V1::UsersController < Api::V1::ApiController
  before_action :authorize_access_request!

  def me
    render json: current_user
  end

  def change_plan
    plan_id = params[:plan_id]
    if (TariffPlan.exists?(plan_id))
      plan = TariffPlan.find(plan_id)
      current_user.tariff_plan = plan
      current_user.prolongate_on(1.month)
      if current_user.referrer_id && User.exists?(current_user.referrer_id)
        @user_referrer = User.find(current_user.referrer_id)
        @user_referrer.tariff_plan = current_user.tariff_plan if @user_referrer.is_plan_free # если  1 месяц уже был на одном плане то + 1 месяц на другом ?
        if current_user.is_plan_yearly
          @user_referrer.prolongate_on(2.month) if !current_user.is_refer_bonus_used
          current_user.is_refer_bonus_used = true
        elsif current_user.is_plan_free
        else
          @user_referrer.prolongate_on(1.month) if !current_user.is_refer_bonus_used
          current_user.is_refer_bonus_used = true
        end
        if @user_referrer.save
          # todo: send success message to referrer
        else
          # todo: send error message to referrer
        end
      end
      if current_user.save
        render json: { notice: I18n.t('pages.dashboard.plans.change.success'), user: current_user }
        return
      end
    end
    render json: { error: I18n.t('pages.dashboard.plans.change.error') }, status: :bad_request
  end
end
