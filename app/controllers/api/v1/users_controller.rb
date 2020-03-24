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
      current_user.update(expired_at: 1.month.from_now)
      if current_user.save
        render json: { notice: I18n.t('pages.dashboard.plans.change.success'), user: current_user }
        return
      end
    end
    render json: { error: I18n.t('pages.dashboard.plans.change.error') }, status: :bad_request
  end
end
