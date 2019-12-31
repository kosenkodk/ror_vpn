require 'rails_helper'

RSpec.describe CancelReason, type: :model do
  let(:title) { 'title' }
  let(:text) { 'text' }
  let(:order) { 10 }
  it do
    item = create(:cancel_reason, title:title, text: text, order: order)
    expect(item.title).to eq(title)
    expect(item.text).to eq(text)
    expect(item.order).to eq(order)
  end
end
