require 'rails_helper'
# require 'errors_controller'

RSpec.describe ErrorsController do #, type: :controller do
  describe "GET " do
    it "renders :404 template" do
      # get not_found_path
      get :not_found
      expect(response).to render_template(:not_found)
    end
  end
end
