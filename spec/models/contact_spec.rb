require 'rails_helper'

RSpec.describe Contact, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  describe 'Contact creation' do
    it 'with email' do
      contact = Contact.new(title: 'title', email: 'test@example.com', message: 'message', message_short: 'message short')
      expect(contact.title).to eq('title')
      expect(contact.email).to eq('test@example.com')
      expect(contact.message).to eq('message')
      expect(contact.message_short).to eq('message short')
      expect(contact.valid?).to be_truthy
    end
    it "with depratment"
  end
  describe 'Contact invalid' do
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
    it 'with not unique email (duplicated email)' do
      contact = Contact.create(email: 'test@example.com')
      contact2 = Contact.create(email: 'test@example.com')
      expect(contact2.valid?).to be_falsy
    end
  end
end
