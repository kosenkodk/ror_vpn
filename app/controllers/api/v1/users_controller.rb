class Api::V1::UsersController < Api::V1::ApiController
  before_action :authorize_access_request!

  def me
    render json: current_user
  end

  def change_plan
    plan_id = params[:plan_id].to_i
    if (TariffPlan.exists?(plan_id))
      plan = TariffPlan.find(plan_id)
      current_user.tariff_plan = plan
      current_user.prolongate_on(1.month)
      current_user.check_refer_bonus
      if current_user.save
        render json: { notice: I18n.t('pages.dashboard.plans.change.success'), user: current_user }
        ApplicationHelper.send_notification(title: I18n.t('pages.dashboard.plans.change.success'), user_id: current_user.id, url: "/user/dashboard") if current_user
        return
      end
    end
    render json: { error: I18n.t('pages.dashboard.plans.change.error') }, status: :bad_request
  end
end
