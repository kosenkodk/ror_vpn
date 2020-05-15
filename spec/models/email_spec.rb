require 'rails_helper'

RSpec.describe Email, type: :model do
  let(:user) { create(:user) }
  let(:email_subscription) { create(:email_subscription, users: [user]) }
  let(:email) { create(:email, email_subscription: email_subscription) }

  it 'email subscription has many emails' do
    expect(email.is_published).to eq(false)
    expect(email_subscription.emails).to include(email)
    expect(email_subscription.emails.count).to eq(1)
  end

  it 'send_newsletter_to_users' do
    expect(email.email_subscription).to eq(email_subscription)
    expect(email.email_subscription.users).to include(user)
    expect(email_subscription.users.count).to eq(1)
    expect(user.email_subscriptions.count).to eq(1)
    email2 = create(:email, email_subscription: email_subscription, is_published: true)
  end

  it 'send_newsletter_to_users' do
    user = create(:user)
    user.email_subscriptions.create(title: 'newsletter')
    user.email_subscriptions.last.emails.create(title: 'email', is_published: true)
  end
end
