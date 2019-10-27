require 'rails_helper'

RSpec.describe Message, type: :model do
  let(:email) {'user@email.com'}
  let(:user) {create(:user, email: email)}
  let!(:message) { create(:message, user: user)}
  let!(:message2) { create(:message, user: user)}

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
    message_json = message.as_json(include: :user)
    expect(message_json.keys).to include 'user'
  end

  it 'get latest message first' do
    # new_message
    messages = Message.order(created_at: :desc)
    expect(messages.first).to eq(message2)
    expect(messages.second).to eq(message)
  end
  
end
