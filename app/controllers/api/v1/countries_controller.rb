class Api::V1::CountriesController < Api::V1::ApiController
  def index
    items = Country.all
    render json: items#.as_json(only: [:id, :name, :code])
  end
end
