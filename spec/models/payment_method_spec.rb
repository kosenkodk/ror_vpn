require 'rails_helper'

RSpec.describe PaymentMethod, type: :model do
  it 'get payment methods for sign up page only' do
    payment_method = create(:payment_method, is_for_signup: true)
    payment_method2 = create(:payment_method)
    expect(PaymentMethod.for_signup.count).to eq(1)
  end
end
