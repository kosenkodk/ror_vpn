FactoryBot.define do
  factory :bank_card do
    full_name { "MyString" }
    card_no { "MyString" }
    card_date { "MyString" }
    card_code { 1 }
    country_code { 1 }
    zip_code { 1 }
  end
end
