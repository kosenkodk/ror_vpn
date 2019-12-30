require 'rails_helper'

RSpec.describe CancelHistory, type: :model do
  let(:user) { create(:user) }
  let(:cancel_reason) { create(:cancel_reason) }
  let(:text) { 'text' }
  it do
    item = create(:cancel_history, user_id: user.id, cancel_reason_id: cancel_reason.id, text: text)
    expect(item.user_id).to eq(user.id)
    expect(item.cancel_reason_id).to eq(cancel_reason.id)
    expect(item.text).to eq(text)
    expect(user.cancel_histories.last).to eq(item)
  end
end
