class Api::V1::UserMfaSessionController < Api::V1::ApiController
  def new
    # load your view
    qr_code_url = current_user.google_qr_uri 
    render json: { notice: 'qr code url', qr_code_url: qr_code_url }
  end

  def create
    user = current_user # grab your currently logged in user
    if user.google_authentic?(params[:mfa_code])
      UserMfaSession.create(user)
      redirect_to root_path
    else
      flash[:error] = "Wrong code"
      render :new
    end
  end

  def delete
    current_user.clear_google_secret
  end
end
