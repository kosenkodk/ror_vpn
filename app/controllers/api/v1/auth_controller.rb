class Api::V1::AuthController < ApplicationController
  
  def login
    # user = User.first
    # render json: user.to_json #.as_json(only: [:id, :title, :subtitle, :text], methods: [:icon_url])
    render json: {'status': 200, 'message': 'ok'}
  end

end