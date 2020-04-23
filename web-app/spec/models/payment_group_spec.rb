require 'rails_helper'

RSpec.describe PaymentGroup, type: :model do
  it 'add payment method to group' do
    group = create(:payment_group)
    payment_method = create(:payment_method, title:'paypal')
    group.is_on_main_page = true
    group.payment_methods << payment_method
    group.save
    expect(group.payment_methods.first.title).to eq('paypal')
    expect(group.is_on_main_page).to eq(true)
  end
end
