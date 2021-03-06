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

  describe 'GET #filter' do
    let!(:ticket_closed) { create(:ticket, status: 'closed', user: user)}
    let!(:ticket_opened) { create(:ticket, status: 'opened', user: user)}

    it 'returns closed tickets' do
      get :filter, params: {status: 'closed'}
      expect(response_json['tickets'].size).to eq 1
      expect(response_json['tickets'].first['status']).to eq 'closed'
    end
    it 'returns opened tickets' do
      get :filter, params: {status: 'opened'}
      expect(response_json['tickets'].size).to eq 1
      expect(response_json['tickets'].first['status']).to eq 'opened'
    end
    it 'returns all tickets' do
      get :filter, params: {status: ''}
      expect(response_json['tickets'].size).to eq 2
      expect(response_json['tickets'].first['status']).to eq 'opened'
      expect(response_json['tickets'].second['status']).to eq 'closed'
    end
  end

  describe 'GET #index' do
    let!(:ticket) { create(:ticket, user: user) }

    it 'returns a success response' do
      get :index
      expect(response).to be_successful
      expect(response_json['tickets'].size).to eq 1
      expect(response_json['tickets'].first['id']).to eq ticket.id
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
    let!(:ticket_with_department) { create(:ticket, user: user, department: create(:department)) }
    before { sign_in_as(user) }

    it 'returns a success response' do
      get :show, params: { id: ticket.id }
      expect(response).to be_successful
    end
    it 'returns a success response' do
      get :show, params: { id: ticket_with_department.id }
      expect(response).to be_successful
      expect(response_json.keys).to include 'department'
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
    let!(:tickets) {(0..5).map {|item| create(:ticket, user: user)}}
    it 'display the first page with empty params' do
      get :index
      expect(response_json['tickets'].size).to eq WillPaginate.per_page
    end
    it 'display first page' do
      get :index, params: {page: 1, per_page: per_page, format: :json}
      expect(response_json.size).to eq per_page
    end
    it 'display last page' do
      get :index, params: {page: tickets.size/per_page, per_page: per_page, format: :json}
      expect(response_json.size).to eq per_page
      expect(response_json.keys).to include "page"
      expect(response_json.keys).to include "pages"
      expect(response_json.keys).to include "tickets"
    end
  end
  it "send email to billing department"
  it "send email to sales department"
  it "send email to tech support department"
end
