class Api::V1::AuthController < ApplicationController
  
  def login
    # user = User.first
    # render json: user.to_json #.as_json(only: [:id, :title, :subtitle, :text], methods: [:icon_url])
    # user = User.find_by!(email: params[:email])
    if (User.exists?(email: params[:email]))
      render json: {'status': 200, 'message': 'ok'}
    else
      render json: {'status': 404, 'message': 'please singup first'}
    end
  end

end