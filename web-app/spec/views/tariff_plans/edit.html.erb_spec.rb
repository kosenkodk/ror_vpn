require 'rails_helper'

RSpec.xdescribe "tariff_plans/edit", type: :view do
  before(:each) do
    @tariff_plan = assign(:tariff_plan, TariffPlan.create!(
      :title => "MyString",
      :price => 1.5,
      :duration => 1,
      :price_duration => 1.5,
      :price_duration_sale => 1.5,
      :price_comment => "MyString",
      :features => "MyText"
    ))
  end

  it "renders the edit tariff_plan form" do
    render

    assert_select "form[action=?][method=?]", tariff_plan_path(@tariff_plan), "post" do

      assert_select "input[name=?]", "tariff_plan[title]"

      assert_select "input[name=?]", "tariff_plan[price]"

      assert_select "input[name=?]", "tariff_plan[duration]"

      assert_select "input[name=?]", "tariff_plan[price_duration]"

      assert_select "input[name=?]", "tariff_plan[price_duration_sale]"

      assert_select "input[name=?]", "tariff_plan[price_comment]"

      assert_select "textarea[name=?]", "tariff_plan[features]"
    end
  end
end
