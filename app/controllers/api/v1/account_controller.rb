class Api::V1::AccountController < Api::V1::ApiController
  before_action :authorize_access_request!
  before_action :find_user, only: [:change_password, :change_email, :set_email_subscriptions, :delete, :cancel]
  KEYS = [:password, :password_confirmation, :password_old].freeze
  EMAIL_KEYS = [:email].freeze

  def account_cancellation_reasons
    items = CancelReason.all
    render json: items
    .as_json(
      only: [:id, :order, :title],
    #   except: [:text, :created_at, :updated_at]
    )
  end

  def cancel
    @user.cancel_account_reason_text = params[:cancel_account_reason_text]
    @user.cancel_reason = CancelReason.find(params[:cancel_account_reason_id])
    @user.tariff_plan = TariffPlan.find_by(price: 0)
    if @user.save
      # @user.block_vpn_user
      # todo: return title of current plan to display in mobile client
      render json: { user: @user, notice: I18n.t('pages.account.cancel.success') }
      ApplicationHelper.send_notification(title: I18n.t('pages.account.cancel.success'), user_id: @user.id)
    else
      render json: { error: I18n.t('pages.account.cancel.error') }
    end
  end

  def delete
    if current_user.present?
      if is_pwd_ok params[:password]
        email_contact = params[:email_contact]
        message = params[:message]
        # add user.email to blacklist and check it during sign up
        BlackListEmail.create(email: current_user.email, email_contact: email_contact, message: message)
        if current_user.destroy
          render json: { notice: I18n.t('pages.account.delete.success') }
          ApplicationHelper.send_notification(title: I18n.t('pages.account.delete.success'), user_id: current_user.id)
        else
          render json: { error: I18n.t('pages.account.delete.error') }
        end
      else
        render json: { error: I18n.t('api.errors.invalid_password') }
      end
    else
      render json: { error: I18n.t('pages.account.delete.error') }
    end
  end

  def change_email
    if is_pwd_ok params[:password]
      email = params[:email]
      # change default validation email message
      if !email.present?
        render json: { error: I18n.t('pages.account.change_email.errors.email_invalid') }
        return
      end
      @user.update!(email_params)
      render json: { user: @user, notice: I18n.t('pages.account.change_email.success') }
      ApplicationHelper.send_notification(title: I18n.t('pages.account.change_email.success'), user_id: @user.id)
    else
      render json: { error: I18n.t('api.errors.invalid_password') } #, status: 401 - force logout client 
    end
  end

  def set_email_subscriptions
    if @user.update(email_subscription_ids: params[:ids].to_a)
      render json: { user: @user, notice: I18n.t('pages.account.change_email_subscription.success') }
    else
      render json: { user: @user, error: I18n.t('pages.account.change_email_subscription.error') }
    end
  end

  def change_password
    if is_pwd_ok params[:password_old]
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
        ApplicationHelper.send_notification(title: I18n.t('pages.account.change_password.success'), user_id: @user.id)
        return
      end
    end
    render json: {error: I18n.t('pages.account.change_password.errors.password_invalid')}#, status: 401
  end

  private
  
  def is_pwd_ok password
    BCrypt::Password.new(@user.password_digest) == password
  end
  
  def email_params
    params.tap { |p| p.require(EMAIL_KEYS) }.permit(*EMAIL_KEYS)
  end

  def password_params
    params.tap { |p| p.require(KEYS) }.permit(*KEYS)
  end

  def find_user
    @user = current_user
  end
end
