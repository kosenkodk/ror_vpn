class Api::V1::SignupController < Api::V1::ApiController
  KEYS = [:email, :password, :password_confirmation].freeze

  def create
    # endpoint for web client — we’ll be renewing a new access with the old expired one
    user = User.new(user_params)
    if user.save
      UserMailer.signup(user).deliver_now
      payload  = { user_id: user.id, aud: [user.role] }
      session = JWTSessions::Session.new(payload: payload,
                                         refresh_by_access_allowed: true,
                                         namespace: "user_#{user.id}")
      tokens = session.login
      response.set_cookie(JWTSessions.access_cookie, value: tokens[:access], httponly: true, secure: Rails.env.production?)
      render json: { csrf: tokens[:csrf] }
    else
      render json: { error: user.errors.full_messages.join(' '), status: :unprocessable_entity}
    end
  end

  private

  def user_params
    params.tap { |p| p.require(KEYS) }.permit(*KEYS)
  end
end
