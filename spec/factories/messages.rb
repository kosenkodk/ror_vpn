FactoryBot.define do
  factory :message do
    title { "MyString" }
    text { "MyText" }
    user { nil }
    ticket_id { nil }
  end
end
