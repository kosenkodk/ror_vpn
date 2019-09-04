# frozen_string_literal: true

FactoryBot.define do
  factory :contact do
    # title { "Title" }
    sequence(:title) { |n| "Contact #{n}" }
    sequence(:email) { |n| "email#{n}@example.com" }

    message { 'Message' }
    message_short { 'Message Short' }
    featured { false }
    cover_image { "#{Rails.root}/fixtures/cover_image.png" }

    # # factory :contact_with_department do
    # # department's association
    # department
    # # association :department, factory: :department, strategy: :build #, email: 'email@example.com'
    # # end 

    factory :beta_contact do
      department { :beta }
    end

    factory :alpha_contact do
    department { :alpha }
    end
  end
end