require 'rails_helper'

RSpec.describe Config, type: :model do
  it do
    country = create(:country)
    plan = create(:tariff_plan)
    config = create(:config, country: country)
    config.update(tariff_plan: plan)
    expect(config.country).to eq(country)
    expect(config.tariff_plan).to eq(plan)
  end
end
