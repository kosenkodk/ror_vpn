class AuthController < ApplicationController
  def login
    @user = User.new
  end
end
