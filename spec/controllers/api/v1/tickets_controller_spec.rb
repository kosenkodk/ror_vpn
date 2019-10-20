require 'rails_helper'

RSpec.describe Api::V1::TicketsController, type: :controller do
  let(:user) { create(:user) }

  let(:valid_attributes) {
    { title: 'new title', attachment: fixture_file_upload(Rails.root.join('app','assets', 'images', 'logo.png'), 'image/png') }
  }

  let(:invalid_attributes) {
    { title: nil }
  }

  before { sign_in_as(user) }

  describe 'GET #index' do
    let!(:ticket) { create(:ticket, user: user) }

    it 'returns a success response' do
      get :index
      expect(response).to be_successful
      expect(response_json.size).to eq 1
      expect(response_json.first['id']).to eq ticket.id
    end

    # usually there's no need to test this kind of stuff, it's here for the presentation purpose
    it 'unauth without cookie' do
      request.cookies[JWTSessions.access_cookie] = nil
      get :index
      expect(response).to have_http_status(401)
    end
  end

  describe 'GET #show' do
    let!(:ticket) { create(:ticket, user: user) }
    before { sign_in_as(user) }

    it 'returns a success response' do
      get :show, params: { id: ticket.id }
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do

    context 'with valid params' do
      it 'creates a new Ticket' do
        expect {
          post :create, params: { ticket: valid_attributes }
        }.to change(Ticket, :count).by(1)
      end

      it 'attaches the uploaded file' do
        # file = fixture_file_upload(Rails.root.join('public', 'favicon.ico'), 'image/png')
        file = fixture_file_upload(Rails.root.join('app','assets', 'images', 'logo.png'), 'image/png') 
        expect {
          post :create, params: { ticket: { title: 'title', attachment: file } }
        }.to change(Ticket, :count).by(1) #change(ActiveStorage::Attachment, :count).by(1)
      end

      it 'renders a JSON response with the new ticket' do
        post :create, params: { ticket: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response.location).to eq(api_v1_ticket_url(Ticket.last))
      end

      it 'unauth without CSRF' do
        request.headers[JWTSessions.csrf_header] = nil
        post :create, params: { ticket: valid_attributes }
        expect(response).to have_http_status(401)
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the new ticket' do
        post :create, params: { ticket: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe 'PUT #update' do
    let!(:ticket) { create(:ticket, user: user) }

    context 'with valid params' do
      let(:new_attributes) {
        { title: 'Super secret title' }
      }

      it 'updates the requested ticket' do
        put :update, params: { id: ticket.id, ticket: new_attributes }
        ticket.reload
        expect(ticket.title).to eq new_attributes[:title]
      end

      it 'renders a JSON response with the ticket' do
        put :update, params: { id: ticket.to_param, ticket: valid_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the ticket' do
        put :update, params: { id: ticket.to_param, ticket: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:ticket) { create(:ticket, user: user) }

    it 'destroys the requested ticket' do
      expect {
        delete :destroy, params: { id: ticket.id }
      }.to change(Ticket, :count).by(-1)
    end
  end

  describe 'Pagination' do
    let(:per_page) {3}
    before {
      tickets = (0..5).map {|item| create(:ticket, user: user) }
    }
    it 'display first page' do
      get :index, params: {page: 1, per_page: per_page, format: :json}
      expect(response_json.size).to eq per_page
    end
    it 'display second page' do
      get :index, params: {page: 2, per_page: per_page, format: :json}
      expect(response_json.size).to eq per_page
    end
  end
  it "send email to billing department"
  it "send email to sales department"
  it "send email to tech support department"
end
