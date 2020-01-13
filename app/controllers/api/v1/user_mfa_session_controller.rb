class Api::V1::UserMfaSessionController < Api::V1::ApiController
  before_action :authorize_access_request!

  def new
    # load your view
    qr_code_url = current_user.google_qr_uri 
    render json: { notice: 'Please scan QR code', qr_code_url: qr_code_url }
  end

  def create
    user = current_user # grab your currently logged in user
    mfa_code = params[:code2fa]
    login_password = params[:password]

    if user.google_authentic?(mfa_code)
      # UserMfaSession.create(user)
      render json: { notice: 'You have enabled two-factor authentication successfully' }
    else
      render json: { error: 'Wrong two-factor code', status: 400 }
    end
  end

  def delete
    current_user.clear_google_secret
  end
end
