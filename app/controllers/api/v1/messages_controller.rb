class Api::V1::MessagesController < ApplicationController
  def create
    message = Message.create(message_params)
    render json: message
  end

  def reply
    message = Message.create(message_params)
    render json: message
  end

  private
  def message_params 
    params.require(:message).permit(:id, :title, :text, :user_id, :user)
  end
end
