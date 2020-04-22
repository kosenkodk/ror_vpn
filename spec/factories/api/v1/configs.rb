FactoryBot.define do
  factory :api_v1_config, class: 'Api::V1::Config' do
    title { "MyString" }
    status { 1 }
  end
end
