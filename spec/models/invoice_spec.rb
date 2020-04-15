require 'rails_helper'

RSpec.describe Invoice, type: :model do
  describe 'notification' do
    it 'after create' do
      user = create(:user)
      Notifier.message(title: I18n.t('pages.notifications.invoice.new'), user_id: user.id, url: "/user/payments")
      expect(Message.first.title).to eq(I18n.t('pages.notifications.invoice.new'))
    end
  end

  it 'create with invoice pdf' do
    plan = create(:tariff_plan_1mo)
    user = create(:user, tariff_plan: plan)
    item = create(:invoice, user: user, amount: plan.price, title: plan.title)
    expect(item.pdf).not_to be nil
    # expect(item.pdf.attached?).to eq true
    expect(item.title).to eq(user.tariff_plan.title)
    expect(item.amount).to eq(user.tariff_plan.price)
    expect(item.no.to_i).to eq(item.id)
  end
  it 'create invoice without params' do
    plan = create(:tariff_plan_1mo)
    user = create(:user, tariff_plan: plan)
    item = create(:invoice, user: user)
    expect(item.user_id).to eq(user.id)
    expect(item.user).to eq(user)
    expect(item.title).to eq(user.tariff_plan.title)
    expect(item.amount).to eq(user.tariff_plan.price)
    expect(item.no.to_i).to eq(item.id)
  end
  it 'create single/one invoice per month' do # invoice.is_exists_for_current_month?
    plan = create(:tariff_plan_1mo)
    user = create(:user, tariff_plan: plan, expired_at: DateTime.now())
    User.check_invoices
    User.check_invoices
    expect(Invoice.count).to eq(1)
  end
end
