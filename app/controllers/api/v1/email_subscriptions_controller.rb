class Api::V1::EmailSubscriptionsController < ApplicationController
  before_action :authorize_access_request!, except: :to_pdf

  def index
    items = EmailSubscription.where(user: current_user).all
    render json: { email_subscriptions: items, email_subscription_ids: current_user.email_subscription_ids  }
  end
end
