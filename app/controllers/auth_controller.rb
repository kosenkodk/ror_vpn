class AuthController < ApplicationController
  layout 'application_without_footer'
  def login
    @user = User.new
    # render layout: 'application_without_footer'
  end
end
