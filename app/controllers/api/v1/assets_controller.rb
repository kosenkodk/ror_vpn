class Api::V1::AssetsController < Api::V1::ApiController
  before_action :authorize_access_request!

  def show
    id = params[:id].to_i
    asset = ActiveStorage::Attachment.find(id)
    # ActiveStorage::Attachment.where(record_type: model_name.to_s, record_id: id).any?
    
    # method 1 (todo: will fix a controller test)
    # url = rails_blob_url(asset) #if asset.attached?
    # file = File.open(url).read

    # method 2 (save file to temp folder and then read)
    # path = File.join(Rails.root, 'tmp', 'invoice'+asset.id.to_s)
    # file = File.open(path, 'wb') do |file|
    #   file.write(asset.blob.download)
    # end
    # file = File.open(path).read
    
    # method 2.1 (read in memory)
    file = asset.blob.download
    
    if params[:download]
      send_data(file, type: asset.blob.content_type, filename: asset.blob.filename.to_s, disposition: 'attachment') # download
    else
      send_data(file, type: asset.blob.content_type, filename: asset.blob.filename.to_s, disposition: 'inline') # view
    end
  end
end
