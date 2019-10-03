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


features = [
  { icon_name: 'no_logs.png', is_published: true, order: 10, title: 'NO LOGS', subtitle: 'Your privacy is and will always be our first priority', text: "VEGA never tracks personal information or logs your online activity as verified by a team of independent security auditors."},
  { icon_name: 'no_leaks.png', is_published: true, order: 20, title: 'NO LEAKS', subtitle: 'Your privacy can be easily compromised by leaks', text: "VEGA software automatically blocks all known privacy leaks, even recently discovered IPv6, DNS and disconnection leaks. It even disables WebRTC."},
  { icon_name: 'fast_multi_hop.png', is_published: true, order: 30, title: 'FAST MULTI HOP', subtitle: 'Your privacy is ensured with high performance multihop servers', text: "Multihop is hard to implement with high performance but we've done it and no competitor comes close. No tunnels within tunnels or other cheap hacks."},
  { icon_name: 'perfomance.png', is_published: true, order: 40, title: 'PERFORMANCE', subtitle: "Your sanity requires a VPN that can keep up with your fibre connection", text: "Our highly optimised load balanced servers are located near our customers to decrease latency and increase speed, you won't even realize you're connected."},
  { icon_name: 'encryption.png', is_published: true, order: 50, title: 'ENCRYPTION', subtitle: 'Your privacy requires strong encryption designed by experts', text: "Which is why VEGA uses AES-256 encryption with 4096-bit RSA keys. New encryption keys are generated every hour providing perfect forward secrecy."},
  { icon_name: 'privacy_and_security.png', is_published: true, order: 60, title: 'PRIVACY & SECURITY GUIDES', subtitle: "Your privacy & security depend on more than connecting to a VPN", text: "Which is why we compile high quality privacy and security guides for our customers to follow, for all levels of experience."}
].each do |item|
  feature = Feature.find_or_create_by(
    is_published: item[:is_published],
    order: item[:order],
    title: item[:title],
    subtitle: item[:subtitle],
    text: item[:text],
  )
  path_to_file = Rails.root.join('app', 'assets', 'images', 'features', item[:icon_name])
  puts "#{path_to_file}\n"
  feature.icon.attach(io: File.open(path_to_file), filename: item[:icon_name])
end

payment_methods = [
  {title: 'Cryptocurrencies', icons: ['bitcoin.png', 'ripple.png', 'ethereum.png']},
  {title: 'Qiwi', icons: ['qiwi.png']},
  {title: 'Credit card', icons: [ 'credit_card/discover.png', 'credit_card/mastercard.png', 'credit_card/visa.png', 'credit_card/amex.png' ]},
].each do |item|
  payment_method = PaymentMethod.find_or_create_by(title: item[:title])
  puts payment_method.try(:title)
  # icons = []
  item[:icons].each do |icon|
    path_to_file = Rails.root.join('app', 'assets', 'images', 'signup', 'payment_methods', icon)
    puts "#{path_to_file}\n"
    payment_method.icons.attach(io: File.open(path_to_file), filename: icon)
  end

end
