FactoryBot.define do
  factory :payment_method do
    title { "MyString" }
    is_for_signup { true }

    factory :pay_with_bank_card do
      title { 'bank card' }
      pay_id { 'bank_card' }
      is_for_signup { false }
    end

    factory :pay_with_paypal do
      title { 'paypal' }
      pay_id { 'paypal' }
      is_for_signup { false }
    end

    factory :pay_with_bitcoin do
      title { 'bitcoin' }
      pay_id { 'bitcoin' }
      is_for_signup { false }
    end

  end
end
