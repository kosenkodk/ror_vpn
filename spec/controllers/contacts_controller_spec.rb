require 'rails_helper'

RSpec.describe ContactsController, type: :controller do

  describe 'Contact Us' do
    it 'should render new template' do
      get :new
      expect(response).to render_template(:new)
    end
  end

end
