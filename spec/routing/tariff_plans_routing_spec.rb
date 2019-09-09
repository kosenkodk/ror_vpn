require "rails_helper"

RSpec.describe TariffPlansController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/tariff_plans").to route_to("tariff_plans#index")
    end

    it "routes to #new" do
      expect(:get => "/tariff_plans/new").to route_to("tariff_plans#new")
    end

    it "routes to #show" do
      expect(:get => "/tariff_plans/1").to route_to("tariff_plans#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/tariff_plans/1/edit").to route_to("tariff_plans#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/tariff_plans").to route_to("tariff_plans#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/tariff_plans/1").to route_to("tariff_plans#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/tariff_plans/1").to route_to("tariff_plans#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/tariff_plans/1").to route_to("tariff_plans#destroy", :id => "1")
    end
  end
end
