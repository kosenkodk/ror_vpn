require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { create(:user) }
  let!(:ticket) { create(:ticket, user: user) }
  let!(:message) { create(:message, user: user, ticket: ticket) }

  it 'destroy user' do
    message.attachment.attach(io: File.open(Rails.root.join('app', 'assets', 'images', 'logo.png')), filename: 'logo.png')
    ticket.messages << message
    expect(Ticket.where(user_id: user.id).count).to eq 1
    expect(Ticket.where(user_id: user.id).first.messages.count).to eq 1
    expect(Message.where(user_id: user.id, ticket_id: ticket.id).count).to eq 1
    user_id = user.id
    user.destroy
    expect(User.where(id: user_id).count).to eq 0
    expect(Ticket.where(user_id: user_id).count).to eq 0
    expect(Message.where(user_id: user_id, ticket_id: ticket.id).count).to eq 0
  end
end
