require 'rails_helper'

RSpec.describe Message, type: :model do
  let(:email) {'user@email.com'}
  let(:user) {create(:user, email: email)}

  it 'create a message without user' do
    message = Message.create(title: 'title', text: 'text')
    expect(message.title).to eq('title')
    expect(message.text).to eq('text')
    expect(message.user).to eq(nil)
  end
  
  it 'create a message with text only' do
    message = Message.create(text: 'text')
    expect(message.text).to eq('text')
  end

  it 'create message with user' do
    message = create(:message, user: user)
    expect(message.user.email).to eq(email)
  end

  it 'get message with user as json' do
    message = create(:message, user: user)
    message_json = message.as_json(include: :user)
    expect(message_json.keys).to include 'user'
  end

  it 'get latest message first' do
    message = create(:message, user: user)
    message2 = create(:message, user: user)
    messages = Message.order(created_at: :desc)
    expect(messages.first).to eq(message2)
    expect(messages.second).to eq(message)
  end
  
  describe 'message status' do
    describe 'is read all messages' do
      context 'true' do
        let(:message) { create(:message, status: 1) }
        it do
          message = create(:message, messageable: user, status: 1)
          message2 = create(:message, messageable: user, status: 'read')
          expect(Message.is_read_all(user)).to eq(true)
        end
      end
      context 'false' do
        it do
          message = create(:message)
          message2 = create(:message, messageable: user, status: 0)
          message3 = create(:message, messageable: user, status: 'unread')
          expect(Message.is_read_all(user)).to eq(false)
        end
      end
    end
    
    it 'read all' do
      message = create(:message, messageable: user, status: 'unread')
      expect(message.is_read).to eq(false)
      message_unread = create(:message, status: 'read')
      Message.read_all(user)
      message.reload
      expect(message.is_read).to eq(true)
      expect(message.status).to eq('read')
    end
  end
  
end
