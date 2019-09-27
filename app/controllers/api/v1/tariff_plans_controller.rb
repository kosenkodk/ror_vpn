class Api::V1::TariffPlansController < ApplicationController
  def index
    items = TariffPlan.all
    render json: items#.as_json(only: [:id, :title, :subtitle, :text], methods: [:icon_url])
  end

  def show
    item = TariffPlan.find(params[:id])
    render json: item#.attributes.merge({icon_url: url_for(item.icon)})
  end
end