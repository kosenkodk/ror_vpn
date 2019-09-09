# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
features = 'All Countries 5,Devices simultaneously,High Speed,Unlimited traffic'
features_free = '1 Country,1 Device,Simultaneously,Medium speed,No torrenting,IKEv2 or OpenVPN'
[
  { title: 'Plan for 1 year', price: 2.99, duration: 0, price_duration: 430.20, price_duration_sale: 322.65, price_comment: '$ 107.55 every 3 years', features: features },
  { title: 'Quarterly plan', price: 3.99, duration: 0, price_duration: 286.80, price_duration_sale: 191.05, price_comment: '$ 95.75 every 2 years', features: features },
  { title: 'Plan for 1 month', price: 6.99, duration: 0, price_duration: 143.40, price_duration_sale: 59.52, price_comment: '$ 83.88 every year', features: features },
  { title: 'Free plan', price: 0.00, duration: 0, price_duration: 0.00, price_duration_sale: 0.00, price_comment: '', features: features_free }
].each do |item|
TariffPlan.find_or_create_by(
  title: item[:title], price: item[:price], 
  duration: item[:duration], price_duration: item[:price_duration], 
  price_duration_sale: item[:price_duration_sale], 
  price_comment: item[:price_comment], features: item[:features]
)
end
