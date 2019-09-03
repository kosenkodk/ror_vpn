require 'rails_helper'

RSpec.describe ErrorsController do #, type: :controller do
  describe "GET " do
    it "renders :404 template" do
      get "/404"
      expect(response).to render_template(:not_found)
    end
  end
end
