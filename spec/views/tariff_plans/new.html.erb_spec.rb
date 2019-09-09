require 'rails_helper'

RSpec.describe "tariff_plans/new", type: :view do
  before(:each) do
    assign(:tariff_plan, TariffPlan.new(
      :title => "MyString",
      :price => 1.5,
      :duration => 1,
      :price_duration => 1.5,
      :price_duration_sale => 1.5,
      :price_comment => "MyString",
      :features => "MyText"
    ))
  end

  it "renders new tariff_plan form" do
    render

    assert_select "form[action=?][method=?]", tariff_plans_path, "post" do

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
