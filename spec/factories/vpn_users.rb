FactoryBot.define do
  factory :vpn_user do
    vpn_login { "MyString" }
    vpn_password { "MyString" }
    vpn_enabled { false }
  end
end
