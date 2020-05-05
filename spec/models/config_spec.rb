require 'rails_helper'

RSpec.describe Config, type: :model do
  it do
    country = create(:country)
    config = create(:config, country: country)
    expect(config.country).to eq(country)
  end
end
