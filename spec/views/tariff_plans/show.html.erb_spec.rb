require 'rails_helper'

RSpec.describe "tariff_plans/show", type: :view do
  before(:each) do
    @tariff_plan = assign(:tariff_plan, TariffPlan.create!(
      :title => "Title",
      :price => 2.5,
      :duration => 3,
      :price_duration => 4.5,
      :price_duration_sale => 5.5,
      :price_comment => "Price Comment",
      :features => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/2.5/)
    expect(rendered).to match(/3/)
    expect(rendered).to match(/4.5/)
    expect(rendered).to match(/5.5/)
    expect(rendered).to match(/Price Comment/)
    expect(rendered).to match(/MyText/)
  end
end
