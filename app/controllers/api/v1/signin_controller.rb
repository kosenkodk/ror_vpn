class Api::V1::SigninController < Api::V1::ApiController
  before_action :authorize_access_request!, only: [:destroy]
  # before_action :authorize_refresh_by_access_header!, only: [:destroy]
  # before_action :authorize_by_access_header!,only: [:destroy]

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
      render json: { csrf: tokens[:csrf], access: tokens[:access] }
    else
      # render json: { }, status: :unauthorized
      not_authorized
    end
  end

  def destroy
    session = JWTSessions::Session.new(payload: payload)
    session.flush_by_access_payload
    render json: { notice: :ok }
  end

  private

  def not_found
    render json: { error: I18n.t('signin.invalid_credentials') }, status: :not_found
  end
end
