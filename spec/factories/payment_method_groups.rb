FactoryBot.define do
  factory :payment_method_group do
    title { "MyString" }
    order { 1 }
    is_on_main_page { false }
    is_draft { false }
  end
end
