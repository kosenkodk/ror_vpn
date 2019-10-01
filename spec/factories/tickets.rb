FactoryBot.define do
  factory :ticket do
    department { 1 }
    title { "MyString" }
    text { "MyText" }
    user { nil }
    status { 1 }
  end
end
