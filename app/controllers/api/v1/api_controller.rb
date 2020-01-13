# class Api::V1::ApiController < ActionController::Base #  UserMfaSession.create(user) # NoMethodError: undefined method `cookies' for nil:NilClass
class Api::V1::ApiController < ActionController::API
  # before_filter :check_mfa

  include ApplicationHelper
  
  include Response
  include ExceptionHandler
  include ActionController::Helpers
  include ActionController::Cookies

  include JWTSessions::RailsAuthorization
  rescue_from ActionController::ParameterMissing, with: :bad_request
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized
  rescue_from JWTSessions::Errors::ClaimsVerification, with: :forbidden
  rescue_from ResetPasswordError, with: :not_authorized

  private

  def check_mfa
     if !(user_mfa_session = UserMfaSession.find) && (user_mfa_session ? user_mfa_session.record == current_user : !user_mfa_session)
      redirect_to new_user_mfa_session_path
    end
  end

  def current_user
    @current_user ||= User.find(payload['user_id'])
  end

  def bad_request
    render json: { error: I18n.t('api.errors.bad_request') }, status: :bad_request
  end

  def forbidden
    render json: { error: I18n.t('api.errors.forbidden') }, status: :forbidden
  end

  def not_authorized
    render json: { error: I18n.t('api.errors.unauthorized') }, status: :unauthorized
  end

  def not_found
    render json: { error: I18n.t('api.errors.not_found') }, status: :not_found
  end

  def unprocessable_entity(exception)
    render json: { error: exception.record.errors.full_messages.join(' ') }, status: :unprocessable_entity
  end
end
