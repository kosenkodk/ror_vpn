class Api::V1::AssetsController < Api::V1::ApiController
  before_action :authorize_access_request!

  def show
    id = params[:id].to_i
    asset = ActiveStorage::Attachment.find(id)
    # ActiveStorage::Attachment.where(record_type: model_name.to_s, record_id: id).any?
    url = rails_blob_url(asset) #if asset.attached?
    # render json: url #{ url: url } 
    # send_file asset.blob.filename.to_s, type: asset.blob.content_type#, disposition: 'inline'
    # send_file File.open(rails_blob_path(File.join(Rails.root,asset))).read
    # send_file rails_blob_path(File.join(Rails.root,asset)), type: asset.blob.content_type

    # send_data asset.blob.download, filename: asset.blob.filename.to_s, type: asset.blob.content_type # download
    # redirect_to rails_blob_path(asset, disposition: 'attachment') # download
    # redirect_to rails_blob_path(asset) # view in browser
    

    # send_data(open(url).read, type: asset.blob.content_type, filename: asset.blob.filename.to_s) # view

    if params[:download]
      send_data(open(url).read, type: asset.blob.content_type, filename: asset.blob.filename.to_s, disposition: 'attachment') # download
    else
      send_data(open(url).read, type: asset.blob.content_type, filename: asset.blob.filename.to_s, disposition: 'inline') # view
    end
  end
end
