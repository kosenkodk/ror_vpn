class Api::V1::UserMfaSessionController < Api::V1::ApiController
  before_action :authorize_access_request!

  def new
    # load your view
    qr_code_url = current_user.google_qr_uri 
    render json: { notice: I18n.t('pages.account.2fa.pls_scan_qr_code'), qr_code_url: qr_code_url }
  end

  def create
    mfa_code = params[:code2fa]
    login_password = params[:password]

    if !is_pwd_ok login_password
      render json: { error: I18n.t('api.errors.invalid_password'), status: 400 }
      return
    end

    if current_user.google_authentic?(mfa_code)
      # UserMfaSession.create(current_user)
      current_user.update(is2fa: true)
      render json: { is2fa: current_user.is2fa, notice: I18n.t('pages.account.2fa.enable.success') }
      send_notification(I18n.t('pages.account.2fa.enable.success'), '', current_user.id)
    else
      render json: { error: I18n.t('pages.account.2fa.enable.error'), status: 400 }
    end
  end

  def destroy
    if (current_user && current_user.update(is2fa: false))
      # current_user.clear_google_secret!
      render json: { is2fa: current_user.is2fa, notice: I18n.t('pages.account.2fa.disable.success') }
      send_notification(I18n.t('pages.account.2fa.disable.success'), '', current_user.id)
    else
      render json: { error: I18n.t('pages.account.2fa.disable.error'), status: 400 }
    end
  end

  private
  def is_pwd_ok password
    BCrypt::Password.new(current_user.password_digest) == password
  end
end
