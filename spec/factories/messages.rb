FactoryBot.define do
  factory :message do
    title { "MyString" }
    text { "MyText" }
    user { nil }
  end
end
