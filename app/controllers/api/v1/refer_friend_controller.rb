class Api::V1::ReferFriendController < ApplicationController
  before_action :authorize_access_request!

  def link
    render json: {refer_link: current_user.get_refer_link}
  end
end
