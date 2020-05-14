require 'rails_helper'

RSpec.describe Email, type: :model do
  
  let(:email_subscription) {create(:email_subscription)}
  let(:email) {create(:email)}

  it 'email subscription has many emails' do
    email_subscription.emails << email
    expect(email.is_published).to eq(false)
    expect(email_subscription.emails).to include(email)
    expect(email_subscription.emails.count).to eq(1)
  end

  let(:user) {create(:user, email_subscriptions: [email_subscription])}
  it 'send newsletter to user' do
    # User.all.each do |user|
    user.email_subscriptions.each do |email_subscription|
      email_subscription.emails.where(is_published: true).each do |email|
        UserMailer.newsletter(user, email, email_subscription)
      end
    end
    # end
  end
end
