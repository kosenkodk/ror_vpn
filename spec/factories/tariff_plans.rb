FactoryBot.define do
  factory :tariff_plan do
    title { 'Plan for 1 year' }
    price { 1.00 }
    duration { 0 }
    price_duration { 2.00 }
    price_duration_sale { 3.00 }
    price_comment { '' }
    features { '1 Country,1 Device,Simultaneously,Medium speed,No torrenting,IKEv2 or OpenVPN' }
  end
end
