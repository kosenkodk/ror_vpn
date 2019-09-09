require 'rails_helper'

RSpec.describe "tariff_plans/index", type: :view do
  before(:each) do
    assign(:tariff_plans, [
      TariffPlan.create!(
        :title => "Title",
        :price => 2.5,
        :duration => 3,
        :price_duration => 4.5,
        :price_duration_sale => 5.5,
        :price_comment => "Price Comment",
        :features => "MyText"
      ),
      TariffPlan.create!(
        :title => "Title",
        :price => 2.5,
        :duration => 3,
        :price_duration => 4.5,
        :price_duration_sale => 5.5,
        :price_comment => "Price Comment",
        :features => "MyText"
      )
    ])
  end

  it "renders a list of tariff_plans" do
    render
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => 2.5.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => 4.5.to_s, :count => 2
    assert_select "tr>td", :text => 5.5.to_s, :count => 2
    assert_select "tr>td", :text => "Price Comment".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
