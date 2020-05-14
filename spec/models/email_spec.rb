require 'rails_helper'

RSpec.describe Email, type: :model do
  let(:email_subscription) {create(:email_subscription)}
  let(:email) {create(:email)}
  
  it 'emails' do
    email_subscription.emails << email
    expect(email_subscription.emails).to include(email)
    expect(email_subscription.emails.count).to eq(1)
  end
end
