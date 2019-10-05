class Api::V1::RefreshController < Api::V1::ApiController
  before_action :authorize_refresh_by_access_request!
  # protect_from_forgery unless: -> { request.format.json? || request.format.xml? }
  
  def create
    session = JWTSessions::Session.new(payload: claimless_payload,
      refresh_by_access_allowed: true,
      namespace: "user_#{claimless_payload['user_id']}")
    # TODO: create a separate set of endpoints for mobile or desktop client which will operate via refresh tokens
    tokens = session.refresh_by_access_payload do # web client (renewing a new access with the old expired one)
      # notify the support team, flush the session or skip the block and ignore this kind of activity
      # overrided by application controller
      raise JWTSessions::Errors::Unauthorized, 'Malicious activity detected'
    end
    response.set_cookie(JWTSessions.access_cookie,
                        value: tokens[:access],
                        httponly: true,
                        secure: Rails.env.production?)

    render json: { csrf: tokens[:csrf] }
  end
end
