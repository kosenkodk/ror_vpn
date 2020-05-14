class Api::V1::EmailSubscriptionsController < ApplicationController
  before_action :authorize_access_request!

  def index
    items = EmailSubscription.all
    render json: { email_subscriptions: items, email_subscription_ids: items.ids, user: current_user  }
  end

end
