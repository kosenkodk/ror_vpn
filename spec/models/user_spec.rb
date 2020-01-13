require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { create(:user) }
  let!(:ticket) { create(:ticket, user: user) }
  let!(:message) { create(:message, user: user, ticket: ticket) }
  let!(:plan) { create(:tariff_plan) }
  let!(:payment_method) { create(:payment_method) }
  let!(:cancel_reason) { create(:cancel_reason) }

  it '2fa' do
    expect(user.set_google_secret).to eq(true)
    expect(user.google_qr_uri).to include(user.email.gsub('@','%40')) # "http://path.to.google/qr?with=params")
    expect(user.google_qr_uri).to include(user.google_secret_value) # 16-character plain-text secret, whatever the name of the secret column 
    expect(user.clear_google_secret!).to eq(true)
    expect(user.google_secret_value).to eq(nil)
    expect(user.google_label).to eq(user.email)
  end

  it 'token not fond' do
    # user.salt = "123"
    item = UserMfaSession.create(user)
    expect(user.mfa_secret).to eq('')
    expect(user.persistence_token).to eq('')
    # user.persistence_token='123'
    expect(item).to eq(UserMfaSession.last)
  end

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

  it 'create user' do
    user = User.create email: 'email@ex.com', password: 'password', password_confirmation: 'password'
    user.payment_method = payment_method
    user.tariff_plan = plan
    # user.payment_method_id = payment_method.id
    # user.tariff_plan_id = plan.id
    user.cancel_reason = cancel_reason
    user.tickets << ticket
    user.save!
    expect(user.tariff_plan.id).to eq(plan.id)
    expect(user.payment_method.id).to eq(payment_method.id)
    expect(user.tickets.first).to eq(ticket)
    expect(user.tickets.count).to eq(1)
  end
end
