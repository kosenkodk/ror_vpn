require 'rails_helper'

RSpec.describe Contact, type: :model do
  let(:department) {create(:department)}

  describe 'GET :new' do
    
    context 'valid data' do
      it 'with email' do
        contact = Contact.new(title: 'title', email: 'test@example.com', message: 'message', message_short: 'message short')
        expect(contact.title).to eq('title')
        expect(contact.email).to eq('test@example.com')
        expect(contact.message).to eq('message')
        expect(contact.message_short).to eq('message short')
        expect(contact.valid?).to be_truthy
      end
      it 'with the same email' do
        contact = Contact.create(email: 'test@example.com', message_short: 'title')
        contact2 = Contact.create(email: 'test@example.com', message_short: 'title')
        expect(contact2.valid?).to be_truthy
      end
      it "with department" do
        contact = Contact.create(email: 'test@example.com', message_short: 'title', department: department)
        contact2 = Contact.create(email: 'test@example.com', message_short: 'title', department: department)
        expect(contact2.valid?).to be_truthy
      end
    end
  
    context 'invalid data' do
      it 'without email' do
        contact = Contact.new(email: nil)
        expect(contact.valid?).to be_falsy
      end
      it 'with empty email' do
        contact = Contact.new(email: '')
        expect(contact.valid?).to be_falsy
      end
      it 'with invalid email' do
        contact = Contact.new(email: 'test')
        expect(contact.valid?).to be_falsy
        contact = Contact.new(email: 'test@')
        expect(contact.valid?).to be_falsy
        contact = Contact.new(email: 'test@test.')
        expect(contact.valid?).to be_falsy
        contact = Contact.new(email: 'test@test')
        expect(contact.valid?).to be_falsy
      end
    end
  end

  it 'get messages' do
    contact = create(:contact)
    message = create(:message, user: create(:user))
    contact.messages << message
    contact.save
    expect(contact.messages.count).to eq 1
    expect(contact.messages.last).to eq message
    expect(contact.as_json).to include 'messages'
  end
end
