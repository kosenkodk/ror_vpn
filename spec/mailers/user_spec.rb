require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  include Rails.application.routes.url_helpers

  let(:user) { create(:user) }
  let(:invoice) { create(:invoice, user: user) }

  context 'notify user with a new invoice' do
    let(:email) { UserMailer.invoice(user, invoice).deliver_now }
    
    it 'with correct email' do
      expect(email.to).to include(user.email)
    end

    it 'with correct subject' do
      expect(email.subject).to eq(I18n.t(:'api.email_notifications.invoice.new', invoice_no: invoice.no))
    end

    it 'with invoice link in body message' do
      expect(email.text_part.body.to_s).to have_text('/user/payments')
    end
  end

end
