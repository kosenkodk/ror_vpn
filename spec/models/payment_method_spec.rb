require 'rails_helper'

RSpec.describe PaymentMethod, type: :model do
  let(:user) {create(:user)}
  it 'get payment methods for sign up page only' do
    payment_method = create(:payment_method, is_for_signup: true)
    payment_method2 = create(:payment_method, is_for_signup: false)
    expect(PaymentMethod.for_signup.count).to eq(1)
  end
  it 'check payment id' do
    payment_method = create(:payment_method, pay_id: 'paypal')
    expect(payment_method.pay_id).to eq('paypal')
  end
  it 'add bank card' do
    country = create(:country)
    bank_card = create(:bank_card, country_id: country.id)
    payment_method = create(:payment_method, pay_id: 'bank_card', user: user, bank_card_id: bank_card.id)
    expect(payment_method.user).to eq(user)
    expect(payment_method.bank_card).to eq(bank_card)
  end
  it 'delete' do
    payment_method = create(:payment_method, user_id: user)
    payment_method.destroy!
  end
end
