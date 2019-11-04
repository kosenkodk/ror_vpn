class Api::V1::AccountController < ApplicationController
  before_action :find_user, only: [:change_password]
  before_action :authorize_access_request!
  KEYS = [:id, :password, :password_confirmation, :password_old].freeze

  def change_password
    if is_old_pwd_ok
      @user.update!(password_params.except(:password_old))
      @user.clear_password_token!
      JWTSessions::Session.new(namespace: "user_#{@user.id}").flush_namespaced
      render json: {notice: I18n.t('pages.account.change_password.success') }
      return
    end
    # render json: :fail, status: 400
  end

  private
  def is_old_pwd_ok
    BCrypt::Password.new(@user.password_digest) == params[:password_old]
  end

  def password_params
    params.tap { |p| p.require(KEYS) }.permit(*KEYS)
  end

  def find_user
    @user = User.find(params[:id])
  end
end
