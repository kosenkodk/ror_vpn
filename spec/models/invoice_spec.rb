require 'rails_helper'

RSpec.describe Invoice, type: :model do
  it 'create with invoice pdf' do
    plan = create(:tariff_plan_1mo)
    user = create(:user, tariff_plan: plan)
    item = create(:invoice, user: user)
    expect(item.pdf).not_to be nil
    expect(item.pdf.attached?).to eq true
    expect(item.title).to eq(user.tariff_plan.title)
    expect(item.amount).to eq(user.tariff_plan.price)
    expect(item.no).to eq(item.id)
  end
end
