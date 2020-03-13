class Api::V1::UsersController < Api::V1::ApiController
  before_action :authorize_access_request!

  def me
    render json: current_user
  end

  def plan_change
    plan_id = params[:plan_id]
    if (TariffPlan.exists?(plan_id))
      plan = TariffPlan.find(plan_id)
      current_user.tariff_plan = plan
      if current_user.save
        render json: { success: 'Plan has been changed successfully'}
        return
      end
    end
    render json: { error: 'Plan can not be changed' }, status: :bad_request
  end
end
