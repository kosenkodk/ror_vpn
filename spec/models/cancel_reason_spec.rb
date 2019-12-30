require 'rails_helper'

RSpec.describe CancelReason, type: :model do
  let(:title) {'title'}
  let(:text) {'text'}
  let(:cancel_history) {create(:cancel_history)}
  let(:cancel_reason) {create(:cancel_reason)}
  it do
    item = create(:cancel_reason, title: title, text: text)
    expect(item.title).to eq(title)
    expect(item.text).to eq(text)
    # item.cancel_history.id = cancel_history
    # expect(item.cancel_history.title).to eq(cancel_history.title)
  end
  it 'ok with cancel history' do
    cancel_history.cancel_reasons << cancel_reason
    expect(cancel_history.cancel_reasons.last).to eq(cancel_reason)
  end
end
