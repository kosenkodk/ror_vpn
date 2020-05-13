require 'rails_helper'

RSpec.describe EmailSubscription, type: :model do
  let(:email_subscription) { create(:email_subscription)}
  let(:user) { create(:user)}
  it do
    expect(user.email_subscriptions.count).to eq(0)
    user.email_subscriptions << email_subscription
    expect(user.email_subscriptions.count).to eq(1)
    expect(user.email_subscriptions).to include(email_subscription)
    expect(email_subscription.users).to include(user)
  end
end
