class Api::V1::EmailSubscriptionsController < ApplicationController
  before_action :authorize_access_request!, except: :to_pdf

  def index
    items = EmailSubscription.all
    render json: items
  end
end
