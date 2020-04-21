class Api::V1::AssetsController < Api::V1::ApiController
  before_action :authorize_access_request!

  def show
    id = params[:id].to_i
    asset = ActiveStorage::Attachment.find(id)
    # ActiveStorage::Attachment.where(record_type: model_name.to_s, record_id: id).any?
    url = rails_blob_url(asset) #if asset.attached?
    
    if params[:download]
      send_data(open(url).read, type: asset.blob.content_type, filename: asset.blob.filename.to_s, disposition: 'attachment') # download
      # send_data asset.blob.download, filename: asset.blob.filename.to_s, type: asset.blob.content_type # download
    else
      send_data(open(url).read, type: asset.blob.content_type, filename: asset.blob.filename.to_s, disposition: 'inline') # view
    end
  end
end
