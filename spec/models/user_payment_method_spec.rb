require 'rails_helper'

RSpec.describe UserPaymentMethod, type: :model do
  let(:user) {create(:user)}

  it 'check associations' do
    payment_method = create(:payment_method)
    user.payment_methods << payment_method
    expect(user.payment_methods.count).to eq(1)
  end
  
  it do
    payment_method = create(:payment_method, user: user)
    expect(payment_method.user).to eq(user)
    # user.reload
    expect(user.payment_methods.count).to eq(1)
  end
end
