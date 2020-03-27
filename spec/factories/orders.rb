FactoryBot.define do
  factory :order do
    no { "" }
    amount { 1.5 }
    currency { "MyString" }
    type { "" }
    user { nil }
  end
end
