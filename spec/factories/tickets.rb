FactoryBot.define do
  factory :ticket do
    department { "billing" }
    title { "Ticket" }
    text { "TicketText" }
    user { nil }
    status { 1 }
  end
end
