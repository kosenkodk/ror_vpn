require 'rails_helper'

RSpec.describe Country, type: :model do
  let(:country) { create(:country) }
  let(:user) {create(:user, country: country)}
  it do
    expect(user.country.name).to eq(country.name)
    expect(user.country).to eq(country)
  end
end
