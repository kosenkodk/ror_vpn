require 'rails_helper'

RSpec.describe ErrorsController, type: :controller do
  it 'renders :404 template' do
    get '/404'
    expect(response).to render_template(:not_found)
  end
end
