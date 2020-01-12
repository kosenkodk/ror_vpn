require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { create(:user) }
  let!(:ticket) { create(:ticket, user: user) }
  let!(:message) { create(:message, user: user, ticket: ticket) }
  let!(:plan) { create(:tariff_plan) }
  let!(:payment_method) { create(:payment_method) }
  let!(:cancel_reason) { create(:cancel_reason) }

  it 'create otp key for 2fa' do
    # user = User.create(email: "hello@heapsource.com")
    user.otp_secret_key = User.otp_random_secret
    otp_secret_code = user.otp_secret_key # = "2z6hxkdwi3uvrnpn"
    otp_code_valid = user.otp_code
    is_valid = user.authenticate_otp(otp_code_valid) # todo: should return boolean value, but return integer (1578855180)
    expect(is_valid).to eq(true)
    sleep 30 # let's wait 30 secs
    otp_code_invalid = '186522'
    expect(user.authenticate_otp(otp_code_invalid)).to eq(false)
    expect(user.provisioning_uri).to eq("otpauth://totp/#{user.email}?secret=#{otp_secret_code}")
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
