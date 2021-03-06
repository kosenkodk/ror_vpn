require 'rails_helper'

RSpec.describe Api::V1::InvoicesController, type: :controller do
  let(:user) { create(:user) }

  let(:valid_attributes) {
    { no: 1234, invoice_type: 'subscription', status: 'pay', amount: 1, currency: '$', user_id: user.id }
  }

  let(:invalid_attributes) {
    { no: nil }
  }

  before { sign_in_as(user) }

  describe 'POST #index' do
    let!(:invoice_of_user) { create(:invoice, user_id: user.id) }
    let!(:invoice2_of_user) { create(:invoice, user_id: user.id) }

    let!(:user2) { create(:user) }
    let!(:invoice_of_user2) { create(:invoice, user_id: user2.id) }

    it 'display user\'s invoices' do
      get :index
      expect(response_json.count).to eq(2)
    end

    xit 'customize all invoices (add name and address to all invoices)' do
      put :update, params: { id: user.id, invoice: {details_from: "name and address"} }
      invoice_of_user.reload
      expect(invoice_of_user.details_from).to eq('name and address')
      # expect(invoice_of_user.title).to eq new_invoice_attributes[:details_from]
      expect(response_json.values).to include('name and address')
    end

    it 'customize (change name with address) last invoice' do
      put :update, params: { id: user.id, invoice: {invoice_details: "name and address"} }
      invoice_of_user.reload
      invoice2_of_user.reload
      expect(invoice2_of_user.details_from).to eq('name and address')
      expect(response_json['invoices'][0].values).to include('name and address')
    end

    it 'pay current invoice' do
      put :update, params: { id: invoice2_of_user.id, invoice: {status: 'paid'} }
      invoice2_of_user.reload
      user.reload
      expect(response_json['invoice'].values).to include('paid')
      expect(invoice2_of_user.status).to eq('paid')
      expect(user.expired_at).to be > 1.month.from_now - 1.minute
    end
  end

  describe 'POST #create' do
    
    context 'with valid params' do
      it 'creates a new Invoice' do
        expect {
          post :create, params: { invoice: valid_attributes }
        }.to change(Invoice, :count).by(1)
      end

      it 'renders a JSON response with the new invoice' do
        post :create, params: { invoice: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(response.location).to eq(api_v1_invoice_url(Invoice.last))
      end

      it 'unauth without CSRF' do
        request.headers[JWTSessions.csrf_header] = nil
        post :create, params: { invoice: valid_attributes }
        expect(response).to have_http_status(401)
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the new invoice' do
        post :create, params: { invoice: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end
end
