class AuthController < ApplicationController
  layout 'no_header_and_footer'

  def login
    @user = User.new
    render layout: 'no_footer'
  end

  def forgot_pwd
    @user = User.new
  end

  def reset_pwd
    # if User.exists?(code: params[:code])
    # @user = User.find_by(code: params[:code])
    @user = User.new
  end

  def success
    
  end
end
