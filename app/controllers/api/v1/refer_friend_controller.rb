class Api::V1::ReferFriendController < ApplicationController
  before_action :authorize_access_request!

  def link
    render json: current_user.get_refer_link
    # render json: items
    # .as_json(
    #   only: [:id, :title],
    # )
  end
end
