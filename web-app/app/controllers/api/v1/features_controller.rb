class Api::V1::FeaturesController < Api::V1::ApiController
  
  def index
    features = Feature.all
    render json: features.as_json(only: [:id, :title, :subtitle, :text], methods: [:icon_url])
  end

  def show
    @feature = Feature.find(params[:id])
    render json: @feature.attributes.merge({icon_url: url_for(@feature.icon)})
  end
end