FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "email-#{n}@test.com" }
    password_digest { "MyString" }
    password { "MyString" }
    password_confirm { "MyString" }
  end
end
