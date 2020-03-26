FactoryBot.define do
  factory :tariff_plan do
    title { 'Plan for 1 year' }
    price { 1.00 }
    duration { 0 }
    price_duration { 2.00 }
    price_duration_sale { 3.00 }
    price_comment { '' }
    features { '1 Country,1 Device,Simultaneously,Medium speed,No torrenting,IKEv2 or OpenVPN' }
    
    factory :tariff_plan_free do
      title { 'Free' }
      price { 0.00 }
    end

    factory :tariff_plan_1mo do
      title { 'Plan for 1 month' }
      price { 6.99 }
    end

    factory :tariff_plan_3mo do
      title { 'Quartely plan' }
      price { 3.99 }
    end

    factory :tariff_plan_12mo do
      title { 'Plan for 1 year' }
      price { 2.99 }
    end
  end
end
