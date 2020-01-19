class Api::V1::SigninController < Api::V1::ApiController
  before_action :authorize_access_request!, only: [:destroy]
  # before_action :authorize_refresh_by_access_header!, only: [:destroy]
  # before_action :authorize_by_access_header!,only: [:destroy]

  def signin_check_credentials
    user = User.find_by!(email: params[:email])
    if user.authenticate(params[:password])
      render json: { user: user }
    else
      render json: { }, status: :unauthorized
    end
  end

  def signin_check_code
    # user = current_user
    user = User.find_by!(email: params[:email])

    if (!user.google_authentic?(params[:code2fa]))
      render json: { error: I18n.t("api.errors.invalid_code") }, status: 400 # :unauthorized (401), forbidden (403)
      return
    end

    render json: { notice: :ok, user: user }
    return

    payload = { user_id: user.id, aud: [user.role] }
    session = JWTSessions::Session.new(payload: payload,
                                        refresh_by_access_allowed: true,
                                        namespace: "user_#{user.id}")
    tokens = session.login

    response.set_cookie(JWTSessions.access_cookie,
                        value: tokens[:access],
                        httponly: true,
                        secure: Rails.env.production?)
    render json: { csrf: tokens[:csrf] }
  end

  def create
    user = User.find_by!(email: params[:email])
    
    if user.authenticate(params[:password])
      payload = { user_id: user.id, aud: [user.role] }
      session = JWTSessions::Session.new(payload: payload,
                                         refresh_by_access_allowed: true,
                                         namespace: "user_#{user.id}")
      tokens = session.login

      response.set_cookie(JWTSessions.access_cookie,
                          value: tokens[:access],
                          httponly: true,
                          secure: Rails.env.production?)
      render json: { csrf: tokens[:csrf] }
    else
      render json: { }, status: :unauthorized
    end
  end

  def destroy
    session = JWTSessions::Session.new(payload: payload, 
      refresh_by_access_allowed: true, # it automatically injects refresh UID into access token, and allows to perform flush_by_access_payload
      namespace: "user_#{payload['user_id']}"
      # namespace: "user_#{claimless_payload['user_id']}" # it works
    )
    session.flush_by_access_payload
    render json: { notice: :ok }
  end

  private

  def not_found
    render json: { error: I18n.t('api.errors.invalid_credentials') }, status: :not_found
  end
end
