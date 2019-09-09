require 'rails_helper'

RSpec.describe "TariffPlans", type: :request do
  describe "GET /tariff_plans" do
    it "works! (now write some real specs)" do
      get tariff_plans_path
      expect(response).to have_http_status(200)
    end
  end
end
