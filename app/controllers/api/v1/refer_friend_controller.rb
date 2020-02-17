class Api::V1::ReferFriendController < Api::V1::ApiController
  before_action :authorize_access_request!

  def link
    render json: {refer_link: current_user.get_refer_link}
  end

  def create
    emails = params[:emails].gsub(' ', '').split(',') if params[:emails]
    emails << params[:email] if params[:email]
    
    if emails.blank?
      render json: {error: I18n.t('api.errors.email_blank'), status: 400}
      return
    end

    emails.each do |email|
      if (email =~ User.email_regex).nil?
        render json: {error: I18n.t('api.errors.invalid_email'), status: 422}
        return
      end
    end

    begin
      emails.each do |email|
        UserMailer.refer_friend(current_user, email).deliver_now
      end
    rescue => exception
      render json: {error: I18n.t('pages.refer_friend.send_invites.error'), status: 400}
      return
    end
    render json: {notice: I18n.t('pages.refer_friend.send_invites.success')}
  end
end
