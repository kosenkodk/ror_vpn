require 'rails_helper'

RSpec.describe Invoice, type: :model do
  it 'create with invoice pdf' do
    user = create(:user)
    item = create(:invoice, user: user)
    expect(item.pdf).not_to be nil
    expect(item.pdf.attached?).to eq true
  end
end
