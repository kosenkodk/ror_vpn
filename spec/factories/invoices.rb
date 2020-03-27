FactoryBot.define do
  factory :invoice do
    no { "" }
    invoice_type { 1 }
    status { 1 }
    amount { 1.5 }
    currency { "MyString" }
    user { nil }
  end
end
