FactoryBot.define do
  factory :invoice do
    no { "" }
    type { 1 }
    status { 1 }
    amount { 1.5 }
    currency { "MyString" }
    user { nil }
  end
end
