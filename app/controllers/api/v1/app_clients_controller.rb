class Api::V1::AppClientsController < Api::V1::ApiController
  # before_action :authorize_access_request!

  def index
    clients = AppClient.all
    render json: {clients: clients}
  end
end
