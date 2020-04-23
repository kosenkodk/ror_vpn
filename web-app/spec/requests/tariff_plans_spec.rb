require 'rails_helper'

RSpec.describe 'Api::V1::TariffPlansController', type: :request do
  describe "GET /tariff_plans" do
    xit "doesn't work in specs only!" do
      get api_v1_tariff_plans_path
      expect(response).to have_http_status(200)
    end
  end
end
