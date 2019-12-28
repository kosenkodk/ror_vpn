require 'rails_helper'

RSpec.describe BlackListEmail, type: :model do
  let(:email) {'email@ex.com'}
  let(:email_contact) {'contact_email@ex.com'}
  let(:message) {'feedback - delete reason'}
  context 'valid data' do
    it 'with feedback and contact email' do
      item = BlackListEmail.new(email: email, email_contact: email_contact, message: message)
      expect(item.email).to eq(email)
      expect(item.email_contact).to eq(email_contact)
      expect(item.message).to eq(message)
      expect(item.valid?).to be_truthy
    end
  end
end
