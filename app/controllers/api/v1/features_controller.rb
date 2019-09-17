class Api::V1::FeaturesController < ApplicationController
  def index
    features = Feature.all
    render json: features.as_json(only: [:id, :title, :subtitle, :text], methods: [:icon_url, :icon_url2])
  end
end