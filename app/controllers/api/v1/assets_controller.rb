class Api::V1::AssetsController < Api::V1::ApiController
  before_action :authorize_access_request!

  def show
    asset = ActiveStorage::Attachment.find(params[:id].to_i)
    # ActiveStorage::Attachment.where(record_type: model_name.to_s, record_id: id).any?
    url = rails_blob_url(asset) #if asset.attached?
    render json: { url: url } 
  end
end
