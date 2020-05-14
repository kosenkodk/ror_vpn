require 'rails_helper'

RSpec.describe Email, type: :model do
  
  let(:email_subscription) { create(:email_subscription) }
  let(:email) { create(:email, email_subscription: email_subscription) }

  it 'email subscription has many emails' do
    expect(email.is_published).to eq(false)
    expect(email_subscription.emails).to include(email)
    expect(email_subscription.emails.count).to eq(1)
  end
end
