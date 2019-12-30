FactoryBot.define do
  factory :cancel_history do
    user { nil }
    cancel_reasons { [] }
    text { "MyText" }
  end
end
