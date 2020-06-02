require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { create(:user) }
  let!(:ticket) { create(:ticket, user: user) }
  let!(:message) { create(:message, user: user, ticket: ticket) }
  let!(:plan) { create(:tariff_plan) }
  let!(:payment_method) { create(:payment_method) }
  let!(:cancel_reason) { create(:cancel_reason) }
  
  context 'refer link' do
    it do
      expect(user.get_refer_link).to eq("https://#{Rails.application.config.host}/signup/#{user.id}")
    end
    it 'with secured refer id' do
      expect(user.ref_id_of_link).to eq(Digest::MD5.hexdigest(user.id.to_s))
    end
  end
  
  context 'vpn user' do
    before { VpnUser.destroy_all }
    it 'block' do
      vpn_user = VpnUser.find_or_create_by(vpn_login: user.email, vpn_enabled: true)
      user.block_vpn_user
      vpn_user.reload
      expect(vpn_user.vpn_login).to eq(user.email)
      expect(vpn_user.vpn_enabled).to eq(false)
    end
    it 'enable' do
      vpn_user = VpnUser.find_or_create_by(vpn_login: user.email, vpn_enabled: false)
      user.enable_vpn_user
      vpn_user.reload
      expect(vpn_user.vpn_login).to eq(user.email)
      expect(vpn_user.vpn_enabled).to eq(true)
    end
    it 'destroy' do
      user = create(:user)
      vpn_user = VpnUser.create(vpn_login: user.email, vpn_enabled: false)
      vpn_user2 = VpnUser.create(vpn_login: user.email, vpn_enabled: false)
      expect(VpnUser.where(vpn_login: user.email).count).to eq(2)
      user.destroy
      expect(VpnUser.where(vpn_login: user.email).count).to eq(0)
    end
  end

  context '2fa' do
    let(:secret) { '5qlcip7azyjuwm36' }

    it 'check code' do
      # code_test = GoogleAuthenticatorRails::generate_password(secret, 1)
      # expect(GoogleAuthenticatorRails::valid?(code_test, secret)).to eq(true)

      code_fresh = GoogleAuthenticatorRails::time_based_password(secret)
      expect(GoogleAuthenticatorRails::valid?(code_fresh, secret)).to eq(true)
      GoogleAuthenticatorRails::time_based_password(secret).should == code_fresh

      totp = ROTP::TOTP.new(secret)
      expect(GoogleAuthenticatorRails::valid?(totp.now, secret)).to eq(true)
      expect(ROTP::TOTP.new(secret).verify_with_drift(totp.now, 1)).to eq(true)
    end

    it 'enable' do
      expect(user.set_google_secret).to eq(true)
      expect(user.google_qr_uri).to include(user.email.gsub('@','%40')) # "http://path.to.google/qr?with=params")
      expect(user.google_qr_uri).to include(user.google_secret_value) # 16-character plain-text secret, whatever the name of the secret column 
      expect(user.clear_google_secret!).to eq(true)
      expect(user.google_secret_value).to eq(nil)
      expect(user.google_label).to eq(user.email)
    end

    it 'is disabled by default' do
      expect(user.is2fa).to eq(false)
    end

    it 'disable' do
      user.update(is2fa: true)
      expect(user.is2fa).to eq(true)
    end

    xit 'token is not found' do
      # user.salt = "123"
      item = UserMfaSession.create(user)
      expect(user.google_secret).not_to eq(nil)
      expect(user.persistence_token).not_to eq(nil)
      # user.persistence_token='123'
      expect(item).to eq(UserMfaSession.last)
    end
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
    user.payment_methods << payment_method
    user.tariff_plan = plan
    # user.payment_method_id = payment_method.id
    # user.tariff_plan_id = plan.id
    user.cancel_reason = cancel_reason
    user.tickets << ticket
    user.save!
    expect(user.tariff_plan.id).to eq(plan.id)
    expect(user.payment_method.id).to eq(payment_method.id)
    expect(user.payment_methods.count).to eq(1)
    expect(user.payment_methods.first.id).to eq(payment_method.id)

    expect(user.tickets.first).to eq(ticket)
    expect(user.tickets.count).to eq(1)
  end

  it 'prolongate subscription' do
    user = create(:user)
    expect(user.expired_at).to eq(nil)
    user.prolongate_on(1.month)
    expect(user.expired_at).to be > 1.month.from_now-5.seconds
    user.prolongate_on(1.month)
    expect(user.expired_at).to be > 2.month.from_now-5.seconds
  end
  
  it 'prolongate expired subscription' do
    user = create(:user, expired_at: 2.month.ago)
    user.prolongate_on(1.month)
    expect(user.expired_at).to be > 1.month.from_now-5.seconds
  end
  
  context 'notifications' do
    it do
      user = create(:user)
      expect(user.messages.count).to eq(0)
      message = create(:message)
      user.messages << message
      expect(user.messages).to include(message)
      expect(user.messages.count).to eq(1)
      user.messages.create(title: 'title')
      expect(user.messages.count).to eq(2)
      expect(message.messageable.id).to eq(user.id)
      
      # message2 = create(:message, messageable_type: User, messageable_id: user.id)
      # message2 = create(:message, messageable_type: 'User', messageable_id: user.id)
      message2 = create(:message, messageable: user)
      expect(message2.messageable.id).to eq(user.id)
      expect(message2.messageable).to eq(user)
      expect(user.messages.count).to eq(3)
      expect(Message.where(messageable_id:user.id).count).to eq(3)
    end
    
    it 'notification' do
      params = {title: I18n.t('pages.notifications.invoice.new'), user_id: user.id} if user
      ApplicationHelper.send_notification(params)
      expect(Message.first.title).to eq(I18n.t('pages.notifications.invoice.new'))
    end
  end

  context 'invoices' do

    it 'downgrade up to free plan if invoice was not paid' do
      plan = create(:tariff_plan_1mo)
      plan_free = create(:tariff_plan_free)
      user = create(:user, expired_at: 1.day.ago, tariff_plan: plan)
      invoice = create(:invoice, user: user)
      User.check_invoices
      user.reload
      expect(user.tariff_plan).to eq(plan_free)
    end

    it 'check notification' do
      User.check_invoices
      expect(Message.first.title).to eq(I18n.t('pages.notifications.invoice.new'))
    end

    it 'check invoices' do
      user = create(:user, tariff_plan: plan)
      user2 = create(:user, tariff_plan: plan)
      User.check_invoices
      
      user.reload
      expect(user.expired_at).not_to eq(nil)
      expect(user.tariff_plan.title).to eq(plan.title)
      expect(user.tariff_plan.price).to eq(plan.price)
      expect(user.invoices.count).to eq(1)
      expect(user.invoices.last.title).to eq(plan.title)
      expect(user.invoices.last.amount).to eq(plan.price)
    
      user2.reload
      expect(user2.expired_at).not_to eq(nil)
      expect(user2.tariff_plan.title).to eq(plan.title)
      expect(user2.tariff_plan.price).to eq(plan.price)
      expect(user2.invoices.count).to eq(1)
      expect(user2.invoices.last.title).to eq(plan.title)
      expect(user2.invoices.last.amount).to eq(plan.price)
    end

    it 'don not send invoice for free plan' do
      user = create(:user, tariff_plan: create(:tariff_plan_free))
      User.check_invoices
      user.reload
      expect(user.invoices.count).to eq(0)
    end

    it 'send invoice to user for paid plan' do
      plan = create(:tariff_plan_1mo)
      user = create(:user, tariff_plan: plan)
      User.check_invoices
      user.reload
      expect(user.invoices.count).to eq(1)
      expect(user.invoices.first.title).to eq(plan.title)
      expect(user.invoices.first.amount).to eq(plan.price)
    end
  end
end
