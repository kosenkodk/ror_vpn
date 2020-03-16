require 'rails_helper'

RSpec.describe PaymentMethod, type: :model do
  it 'get payment methods for sign up page only' do
    payment_method = create(:payment_method, is_for_signup: true)
    payment_method2 = create(:payment_method, is_for_signup: false)
    expect(PaymentMethod.for_signup.count).to eq(1)
  end
  it 'check payment id' do
    payment_method = create(:payment_method, pay_id: 'paypal')
    expect(payment_method.pay_id).to eq('paypal')
  end
end
