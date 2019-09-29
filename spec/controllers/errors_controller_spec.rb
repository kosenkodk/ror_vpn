require 'rails_helper'

RSpec.xdescribe ErrorsController, type: :controller do
  describe 'GET custom error pages' do
    it 'renders :404 template' do
      get :not_found
      expect(response).to render_template(:not_found)
    end
    it 'renders coming soon page' do
      get :coming_soon
      expect(response).to render_template(:coming_soon)
    end
    it 'renders unacceptable page' do
      get :unacceptable
      expect(response).to render_template(:unacceptable)
    end
    it 'renders internal server erro page' do
      get :internal_error
      expect(response).to render_template(:internal_error)
    end
  end
end
