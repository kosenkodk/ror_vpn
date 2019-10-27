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
  
end
