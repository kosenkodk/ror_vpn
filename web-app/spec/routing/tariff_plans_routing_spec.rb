require "rails_helper"

RSpec.describe Api::V1::TariffPlansController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/api/v1/tariff_plans").to route_to("api/v1/tariff_plans#index")
    end

    it "routes to #new" do
      expect(:get => "/api/v1/tariff_plans/new").to route_to("api/v1/tariff_plans#new")
    end

    it "routes to #show" do
      expect(:get => "/api/v1/tariff_plans/1").to route_to("api/v1/tariff_plans#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/api/v1/tariff_plans/1/edit").to route_to("api/v1/tariff_plans#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/api/v1/tariff_plans").to route_to("api/v1/tariff_plans#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/api/v1/tariff_plans/1").to route_to("api/v1/tariff_plans#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/api/v1/tariff_plans/1").to route_to("api/v1/tariff_plans#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/api/v1/tariff_plans/1").to route_to("api/v1/tariff_plans#destroy", :id => "1")
    end
  end
end
