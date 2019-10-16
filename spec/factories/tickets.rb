FactoryBot.define do
  factory :ticket do
    department { nil }
    title { "Ticket" }
    text { "TicketText" }
    user { nil }
    status { 0 }
  end
end
