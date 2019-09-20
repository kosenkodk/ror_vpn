class AuthController < ApplicationController
  layout 'no_header_and_footer'
  before_action :user_new, except: [:success]
  
  def login
    render layout: 'no_footer'
  end
  
  def login_post
    redirect_to tariff_plans_path
  end

  def signup
    @plan_active_index = 0
    @payment_method_item_active_index = 1
    @plans = TariffPlan.all
    render layout: 'application'
  end

  def forgot_pwd
  end

  def reset_pwd
    # if User.exists?(code: params[:code])
    # @user = User.find_by(code: params[:code])
  end

  def success
    
  end
  
  private
  def user_new
    @user = User.new
  end
end
