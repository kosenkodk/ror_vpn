class Api::V1::AccountController < Api::V1::ApiController
  before_action :authorize_access_request!
  before_action :find_user, only: [:change_password]
  KEYS = [:id, :password, :password_confirmation, :password_old].freeze

  def change_password
    if is_old_pwd_ok
      if params[:password_old] == params[:password]
        render json: {error: I18n.t('pages.account.change_password.errors.use_another_password') }
        return
      else
        @user.update!(password_params.except(:password_old))
        @user.clear_password_token!

        payload = { user_id: @user.id, aud: [@user.role] }
        # session = JWTSessions::Session.new(namespace: "user_#{@user.id}").flush_namespaced
        session = JWTSessions::Session.new(payload: payload,
                                          #  refresh_by_access_allowed: true,
                                           namespace: "user_#{@user.id}")
        tokens = session.login
        response.set_cookie(JWTSessions.access_cookie,
          value: tokens[:access],
          httponly: true,
          secure: Rails.env.production?)

        render json: {csrf: tokens[:csrf], notice: I18n.t('pages.account.change_password.success') }
        return
      end
    end
    render json: {error: I18n.t('pages.account.change_password.errors.password_invalid')}, status: 400
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
