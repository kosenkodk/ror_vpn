require 'rails_helper'

RSpec.describe PaymentGroup, type: :model do
  it 'add payment method to group' do
    group = create(:payment_method_group)
    payment_method = create(:payment_method, title:'paypal')
    group.payment_methods << payment_method
    group.save
    expect(group.payment_methods.first.title).to eq('paypal')
  end
end
