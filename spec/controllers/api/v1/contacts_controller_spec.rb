require 'rails_helper'

RSpec.describe Api::V1::ContactsController, type: :controller do
  xdescribe 'GET new' do
    it 'renders :new template' do
      get :new
      expect(response).to render_template(:new)
    end

    it 'assings new Contact to @contact' do
      get :new
      expect(assigns(:contact)).to be_a_new(Contact)
    end
  end

  describe 'POST create' do
    let(:valid_data) { 
      FactoryBot.attributes_for(:contact) 
      # FactoryBot.build(:contact).attributes #.except('id')
    }
    context 'valid data' do
      it 'redirects to contacts#show' do
        post :create, params: { contact: valid_data }
        expect(response.body).to eq I18n.t('pages.contact_us.success_message')
      end
      it 'create new contact in database' do
        expect {
          post :create, params: { contact: valid_data }
        }.to change(Contact, :count).by(1)
      end
    end
    context 'invalid data' do
      let(:invalid_data) { FactoryBot.attributes_for(:contact, email: '') }
      it 'renders :new template' do
        post :create, params: { contact: invalid_data }
        # expect(response.body).to eq I18n.t('pages.contact_us.error_message')
        expect(response.body).to have_content("Email can't be blank")
        expect(response.body).to have_text("Email is invalid")
      end
      it 'doesn\'t create new contact in the database' do
        expect {
          post :create, params: { contact: invalid_data }
        }.not_to change(Contact, :count)
      end
    end
  end

end
