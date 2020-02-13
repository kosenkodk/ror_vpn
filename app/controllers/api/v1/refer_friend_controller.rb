class Api::V1::ReferFriendController < ApplicationController
  before_action :authorize_access_request!

  def link
    render json: {refer_link: current_user.get_refer_link}
  end

  def create
    emails = params[:emails].gsub(' ', '').split(',') if params[:emails]
    emails << params[:email] if params[:email]
    begin
      emails.each do |email|
        UserMailer.refer_friend(current_user, email).deliver_now
      end
    rescue => exception
      render json: {error: 'error', status: 500}
      return
    end
    render json: {ok: 'ok'}
  end
end
