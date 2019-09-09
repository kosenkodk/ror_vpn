FactoryBot.define do
  factory :tariff_plan do
    title { "MyString" }
    price { 1.5 }
    duration { 1 }
    price_duration { 1.5 }
    price_duration_sale { 1.5 }
    price_comment { "MyString" }
    features { "MyText" }
  end
end
