class Api::V1::UsersController < Api::V1::ApiController
  before_action :authorize_access_request!

  def me
    render json: current_user
  end

  def change_plan
    plan_id = params[:plan_id].to_i
    if (TariffPlan.exists?(plan_id))
      plan = TariffPlan.find(plan_id)
      if (current_user.is_last_invoice_paid)
        current_user.tariff_plan = plan
      else
        render json: { notice: I18n.t('invoice_is_not_paid'), user: current_user }
        return
      end
      if current_user.save
        render json: { notice: I18n.t('pages.dashboard.plans.change.success'), user: current_user }
        return
      end
    end
    render json: { error: I18n.t('pages.dashboard.plans.change.error') }, status: :bad_request
  end
end
