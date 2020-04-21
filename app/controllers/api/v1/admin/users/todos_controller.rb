class Api::V1::Admin::Users::TodosController < ApplicationController
  before_action :authorize_access_request!
  before_action :set_user
  ROLES = %w[admin].freeze

  def index
    render json: @user.todos
  end

  def token_claims
    {
      aud: ROLES,
      verify_aud: true
    }
  end

  private

  def set_user
    @user = User.find(params[:user_id].to_i)
  end
end
