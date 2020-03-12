require 'rails_helper'

RSpec.describe Api::V1::CountriesController, type: :controller do
  it do
    get :index
    # expect(response).to eq(200)
    expect(response).to have_http_status(200)
    expect(response_json).to eq([])
  end
end
