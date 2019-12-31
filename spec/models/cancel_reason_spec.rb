require 'rails_helper'

RSpec.describe CancelReason, type: :model do
  let(:title) { 'title' }
  let(:text) { 'text' }
  let(:order) { 10 }
  let(:user) { create(:user) }
  let(:item) { create(:cancel_reason, title: title, text: text, order: order) }
  
  it do
    expect(item.title).to eq(title)
    expect(item.text).to eq(text)
    expect(item.order).to eq(order)
  end
  
  it 'add cancel reason to user' do
    user.cancel_reason = item
    user.save
    expect(user.cancel_reason).to eq(item)
    expect(item.users.last).to eq(user)
  end
end
