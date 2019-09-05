class AuthController < ApplicationController
  # layout 'application_without_footer'
  
  def login
    @user = User.new
    render layout: 'no_footer'
  end

  def forgot
    @user = User.new
    render layout: 'no_header_and_footer'
  end
end
