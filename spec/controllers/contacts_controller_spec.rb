require 'rails_helper'

RSpec.describe ContactsController, type: :controller do

  describe 'Contact Us > GET new' do
    it 'renders :new template' do
      get :new
      expect(response).to render_template(:new)
    end

    it 'assings new Contact to @contact' do
      get :new
      expect(assigns(:contact)).to be_a_new(Contact)
    end
  end

end
