class Api::V1::UserMfaSessionController < Api::V1::ApiController
  before_action :authorize_access_request!

  def new
    # load your view
    qr_code_url = current_user.google_qr_uri 
    render json: { notice: I18n.t('pages.account.2fa.pls_scan_qr_code'), qr_code_url: qr_code_url }
  end

  def create
    user = current_user # grab your currently logged in user
    mfa_code = params[:code2fa]
    login_password = params[:password]

    if user.google_authentic?(mfa_code)
      # UserMfaSession.create(user)
      user.update(is2fa: true)
      render json: { notice: I18n.t('pages.account.2fa.enable.success') }
    else
      render json: { error: I18n.t('pages.account.2fa.enable.error'), status: 400 }
    end
  end

  def destroy
    if (current_user && current_user.update(is2fa: false))
      # current_user.clear_google_secret!
      render json: { notice: I18n.t('pages.account.2fa.disable.success') }
    else
      render json: { error: I18n.t('pages.account.2fa.disable.error') }
    end
  end
end
