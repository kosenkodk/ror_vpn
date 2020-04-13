# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "\nTariff Plans\n\n"
features = 'All Countries,5 Devices simultaneously,High Speed,Unlimited traffic'
features_free = '1 Country,1 Device,Simultaneously,Medium speed,No torrenting,IKEv2 or OpenVPN'
plans = [
  # { title: 'Annual', price: 2.99, duration: 0, price_duration: 430.20, price_duration_sale: 322.65, price_comment: '$ 107.55 every 3 years', features: features },
  # { title: 'Quarterly', price: 3.99, duration: 0, price_duration: 286.80, price_duration_sale: 191.05, price_comment: '$ 95.75 every 2 years', features: features },
  # { title: 'Monthly', price: 6.99, duration: 0, price_duration: 143.40, price_duration_sale: 59.52, price_comment: '$ 83.88 every year', features: features },
  # { title: 'Free', price: 0.00, duration: 0, price_duration: 0.00, price_duration_sale: 0.00, price_comment: '', features: features_free }
  { title: 'Plan for 1 year', price: 2.99, duration: 0, price_duration: 430.20, price_duration_sale: 322.65, price_comment: '$ 107.55 every 3 years', features: features },
  { title: 'Quarterly plan', price: 3.99, duration: 0, price_duration: 286.80, price_duration_sale: 191.05, price_comment: '$ 95.75 every 2 years', features: features },
  { title: 'Plan for 1 month', price: 6.99, duration: 0, price_duration: 143.40, price_duration_sale: 59.52, price_comment: '$ 83.88 every year', features: features },
  { title: 'Free plan', price: 0.00, duration: 0, price_duration: 0.00, price_duration_sale: 0.00, price_comment: '', features: features_free }
]
plans.each do |item|
TariffPlan.find_or_create_by(
  title: item[:title], price: item[:price], 
  duration: item[:duration], price_duration: item[:price_duration], 
  price_duration_sale: item[:price_duration_sale], 
  price_comment: item[:price_comment], features: item[:features]
)
end

puts "\nFeatures\n\n"
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

# puts "\nPayment Groups:\n\n"
# payment_groups = [
#   {title: I18n.t('payment_method.cryptocurrencies'), is_on_main_page: true, is_read_only: false, icons: ['bitcoin.png', 'ripple.png', 'ethereum.png'],
#     payment_methods: [
#       {title: I18n.t('pay_with.bitcoin'), icon: 'bitcoin.png', is_active: true},
#       {title: I18n.t('pay_with.ripple'), icon: 'ripple.png', is_active: false},
#       {title: I18n.t('pay_with.ethereum'), icon: 'ethereum.png', is_active: false},
#     ]
#   },
#   {title: I18n.t('payment_method.qiwi'), is_on_main_page: true, is_read_only: false, icons: ['qiwi.png'],
#     payment_methods: [
#       {title: I18n.t('payment_method.qiwi'), icon: 'qiwi.png', is_active: false, is_for_signup: true},
#     ]
#   },
#   {title: I18n.t('payment_method.credit_card'), is_on_main_page: true, is_read_only: false, icons: ['credit_card/discover.png', 'credit_card/mastercard.png', 'credit_card/visa.png', 'credit_card/amex.png'],
#     payment_methods: [
#       {title: I18n.t('pay_with.credit_card'), icon: 'credit_card/visa.png', is_active: true, is_for_signup: true},
#     ]
#   },
#   {title: I18n.t('pay_with.other_payments'), is_on_main_page: false, is_read_only: false, icons: ['webmoney.png', 'im.png', 'ideal.png', 'klarna.png', 'yandex_money.png', 'giropay.png', 'paypal.png'],
#     payment_methods: [
#       {title: I18n.t('pay_with.paypal'), icon: 'paypal.png', is_active: true, is_for_signup: false},
#     ]
#   },
# ]
# payment_groups.each do |group|
#   payment_group = nil
#   payment_group = PaymentGroup.create(title: group[:title], is_on_main_page: group[:is_on_main_page])
#   puts "payment group: #{payment_group.title}\n"
#   group[:icons].each do |icon|
#     path_to_file = Rails.root.join('app', 'assets', 'images', 'signup', 'payment_methods', icon)
#     puts " #{path_to_file}\n"
#     payment_group.icons.attach(io: File.open(path_to_file), filename: icon)
#   end
#   puts " payment methods:\n"
#   group[:payment_methods].each do |item|
#     payment_method = nil
#     payment_method = PaymentMethod.create(title: item[:title], is_active: item[:is_active])
#     path_to_file = Rails.root.join('app', 'assets', 'images', 'signup', 'payment_methods', item[:icon])
#     payment_method.icons.attach(io: File.open(path_to_file), filename: item[:icon])
#     payment_group.payment_methods << payment_method
#     puts "  #{payment_method.title} #{item[:icon]}\n"
#     payment_group.save
#   end
# end

puts "\nPayment Methods\n\n"
payment_methods = [
  {is_for_signup: true, title: I18n.t('payment_method.cryptocurrencies'), icons: ['bitcoin.png', 'ripple.png', 'ethereum.png']},
  {is_for_signup: true, title: I18n.t('payment_method.qiwi'), icons: ['qiwi.png']},
  {is_for_signup: true, title: I18n.t('payment_method.credit_card'), icons: [ 'credit_card/discover.png', 'credit_card/mastercard.png', 'credit_card/visa.png', 'credit_card/amex.png' ]},
  {pay_id: 'bank_card', title: I18n.t('pay_with.credit_card'), icons: ['credit_card/visa.png']},
  {pay_id: 'paypal', title: I18n.t('pay_with.paypal'), icons: ['paypal.png']},
  {pay_id: 'bitcoin', title: I18n.t('pay_with.bitcoin'), icons: ['bitcoin.png']},
  {pay_id: 'paymentwall', title: I18n.t('pay_with.other_payments'), icons: ['webmoney.png', 'im.png', 'ideal.png', 'klarna.png', 'yandex_money.png', 'giropay.png' ]},
].each do |item|
  payment_method = PaymentMethod.find_or_create_by(pay_id: item[:pay_id], title: item[:title], is_for_signup: item[:is_for_signup] || false)
  puts payment_method.try(:title)
  # icons = []
  item[:icons].each do |icon|
    path_to_file = Rails.root.join('app', 'assets', 'images', 'signup', 'payment_methods', icon)
    puts "#{path_to_file}\n"
    payment_method.icons.attach(io: File.open(path_to_file), filename: icon)
  end
end

puts "\nCountries\n\n"
[ 
  {name: 'Afghanistan', code: 'AF'}, 
  {name: 'Åland Islands', code: 'AX'}, 
  {name: 'Albania', code: 'AL'}, 
  {name: 'Algeria', code: 'DZ'}, 
  {name: 'American Samoa', code: 'AS'}, 
  {name: 'AndorrA', code: 'AD'}, 
  {name: 'Angola', code: 'AO'}, 
  {name: 'Anguilla', code: 'AI'}, 
  {name: 'Antarctica', code: 'AQ'}, 
  {name: 'Antigua and Barbuda', code: 'AG'}, 
  {name: 'Argentina', code: 'AR'}, 
  {name: 'Armenia', code: 'AM'}, 
  {name: 'Aruba', code: 'AW'}, 
  {name: 'Australia', code: 'AU'}, 
  {name: 'Austria', code: 'AT'}, 
  {name: 'Azerbaijan', code: 'AZ'}, 
  {name: 'Bahamas', code: 'BS'}, 
  {name: 'Bahrain', code: 'BH'}, 
  {name: 'Bangladesh', code: 'BD'}, 
  {name: 'Barbados', code: 'BB'}, 
  {name: 'Belarus', code: 'BY'}, 
  {name: 'Belgium', code: 'BE'}, 
  {name: 'Belize', code: 'BZ'}, 
  {name: 'Benin', code: 'BJ'}, 
  {name: 'Bermuda', code: 'BM'}, 
  {name: 'Bhutan', code: 'BT'}, 
  {name: 'Bolivia', code: 'BO'}, 
  {name: 'Bosnia and Herzegovina', code: 'BA'}, 
  {name: 'Botswana', code: 'BW'}, 
  {name: 'Bouvet Island', code: 'BV'}, 
  {name: 'Brazil', code: 'BR'}, 
  {name: 'British Indian Ocean Territory', code: 'IO'}, 
  {name: 'Brunei Darussalam', code: 'BN'}, 
  {name: 'Bulgaria', code: 'BG'}, 
  {name: 'Burkina Faso', code: 'BF'}, 
  {name: 'Burundi', code: 'BI'}, 
  {name: 'Cambodia', code: 'KH'}, 
  {name: 'Cameroon', code: 'CM'}, 
  {name: 'Canada', code: 'CA'}, 
  {name: 'Cape Verde', code: 'CV'}, 
  {name: 'Cayman Islands', code: 'KY'}, 
  {name: 'Central African Republic', code: 'CF'}, 
  {name: 'Chad', code: 'TD'}, 
  {name: 'Chile', code: 'CL'}, 
  {name: 'China', code: 'CN'}, 
  {name: 'Christmas Island', code: 'CX'}, 
  {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
  {name: 'Colombia', code: 'CO'}, 
  {name: 'Comoros', code: 'KM'}, 
  {name: 'Congo', code: 'CG'}, 
  {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
  {name: 'Cook Islands', code: 'CK'}, 
  {name: 'Costa Rica', code: 'CR'}, 
  {name: 'Cote D\'Ivoire', code: 'CI'}, 
  {name: 'Croatia', code: 'HR'}, 
  {name: 'Cuba', code: 'CU'}, 
  {name: 'Cyprus', code: 'CY'}, 
  {name: 'Czech Republic', code: 'CZ'}, 
  {name: 'Denmark', code: 'DK'}, 
  {name: 'Djibouti', code: 'DJ'}, 
  {name: 'Dominica', code: 'DM'}, 
  {name: 'Dominican Republic', code: 'DO'}, 
  {name: 'Ecuador', code: 'EC'}, 
  {name: 'Egypt', code: 'EG'}, 
  {name: 'El Salvador', code: 'SV'}, 
  {name: 'Equatorial Guinea', code: 'GQ'}, 
  {name: 'Eritrea', code: 'ER'}, 
  {name: 'Estonia', code: 'EE'}, 
  {name: 'Ethiopia', code: 'ET'}, 
  {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
  {name: 'Faroe Islands', code: 'FO'}, 
  {name: 'Fiji', code: 'FJ'}, 
  {name: 'Finland', code: 'FI'}, 
  {name: 'France', code: 'FR'}, 
  {name: 'French Guiana', code: 'GF'}, 
  {name: 'French Polynesia', code: 'PF'}, 
  {name: 'French Southern Territories', code: 'TF'}, 
  {name: 'Gabon', code: 'GA'}, 
  {name: 'Gambia', code: 'GM'}, 
  {name: 'Georgia', code: 'GE'}, 
  {name: 'Germany', code: 'DE'}, 
  {name: 'Ghana', code: 'GH'}, 
  {name: 'Gibraltar', code: 'GI'}, 
  {name: 'Greece', code: 'GR'}, 
  {name: 'Greenland', code: 'GL'}, 
  {name: 'Grenada', code: 'GD'}, 
  {name: 'Guadeloupe', code: 'GP'}, 
  {name: 'Guam', code: 'GU'}, 
  {name: 'Guatemala', code: 'GT'}, 
  {name: 'Guernsey', code: 'GG'}, 
  {name: 'Guinea', code: 'GN'}, 
  {name: 'Guinea-Bissau', code: 'GW'}, 
  {name: 'Guyana', code: 'GY'}, 
  {name: 'Haiti', code: 'HT'}, 
  {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
  {name: 'Holy See (Vatican City State)', code: 'VA'}, 
  {name: 'Honduras', code: 'HN'}, 
  {name: 'Hong Kong', code: 'HK'}, 
  {name: 'Hungary', code: 'HU'}, 
  {name: 'Iceland', code: 'IS'}, 
  {name: 'India', code: 'IN'}, 
  {name: 'Indonesia', code: 'ID'}, 
  {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
  {name: 'Iraq', code: 'IQ'}, 
  {name: 'Ireland', code: 'IE'}, 
  {name: 'Isle of Man', code: 'IM'}, 
  {name: 'Israel', code: 'IL'}, 
  {name: 'Italy', code: 'IT'}, 
  {name: 'Jamaica', code: 'JM'}, 
  {name: 'Japan', code: 'JP'}, 
  {name: 'Jersey', code: 'JE'}, 
  {name: 'Jordan', code: 'JO'}, 
  {name: 'Kazakhstan', code: 'KZ'}, 
  {name: 'Kenya', code: 'KE'}, 
  {name: 'Kiribati', code: 'KI'}, 
  {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
  {name: 'Korea, Republic of', code: 'KR'}, 
  {name: 'Kuwait', code: 'KW'}, 
  {name: 'Kyrgyzstan', code: 'KG'}, 
  {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
  {name: 'Latvia', code: 'LV'}, 
  {name: 'Lebanon', code: 'LB'}, 
  {name: 'Lesotho', code: 'LS'}, 
  {name: 'Liberia', code: 'LR'}, 
  {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
  {name: 'Liechtenstein', code: 'LI'}, 
  {name: 'Lithuania', code: 'LT'}, 
  {name: 'Luxembourg', code: 'LU'}, 
  {name: 'Macao', code: 'MO'}, 
  {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
  {name: 'Madagascar', code: 'MG'}, 
  {name: 'Malawi', code: 'MW'}, 
  {name: 'Malaysia', code: 'MY'}, 
  {name: 'Maldives', code: 'MV'}, 
  {name: 'Mali', code: 'ML'}, 
  {name: 'Malta', code: 'MT'}, 
  {name: 'Marshall Islands', code: 'MH'}, 
  {name: 'Martinique', code: 'MQ'}, 
  {name: 'Mauritania', code: 'MR'}, 
  {name: 'Mauritius', code: 'MU'}, 
  {name: 'Mayotte', code: 'YT'}, 
  {name: 'Mexico', code: 'MX'}, 
  {name: 'Micronesia, Federated States of', code: 'FM'}, 
  {name: 'Moldova, Republic of', code: 'MD'}, 
  {name: 'Monaco', code: 'MC'}, 
  {name: 'Mongolia', code: 'MN'}, 
  {name: 'Montserrat', code: 'MS'}, 
  {name: 'Morocco', code: 'MA'}, 
  {name: 'Mozambique', code: 'MZ'}, 
  {name: 'Myanmar', code: 'MM'}, 
  {name: 'Namibia', code: 'NA'}, 
  {name: 'Nauru', code: 'NR'}, 
  {name: 'Nepal', code: 'NP'}, 
  {name: 'Netherlands', code: 'NL'}, 
  {name: 'Netherlands Antilles', code: 'AN'}, 
  {name: 'New Caledonia', code: 'NC'}, 
  {name: 'New Zealand', code: 'NZ'}, 
  {name: 'Nicaragua', code: 'NI'}, 
  {name: 'Niger', code: 'NE'}, 
  {name: 'Nigeria', code: 'NG'}, 
  {name: 'Niue', code: 'NU'}, 
  {name: 'Norfolk Island', code: 'NF'}, 
  {name: 'Northern Mariana Islands', code: 'MP'}, 
  {name: 'Norway', code: 'NO'}, 
  {name: 'Oman', code: 'OM'}, 
  {name: 'Pakistan', code: 'PK'}, 
  {name: 'Palau', code: 'PW'}, 
  {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
  {name: 'Panama', code: 'PA'}, 
  {name: 'Papua New Guinea', code: 'PG'}, 
  {name: 'Paraguay', code: 'PY'}, 
  {name: 'Peru', code: 'PE'}, 
  {name: 'Philippines', code: 'PH'}, 
  {name: 'Pitcairn', code: 'PN'}, 
  {name: 'Poland', code: 'PL'}, 
  {name: 'Portugal', code: 'PT'}, 
  {name: 'Puerto Rico', code: 'PR'}, 
  {name: 'Qatar', code: 'QA'}, 
  {name: 'Reunion', code: 'RE'}, 
  {name: 'Romania', code: 'RO'}, 
  {name: 'Russian Federation', code: 'RU'}, 
  {name: 'RWANDA', code: 'RW'}, 
  {name: 'Saint Helena', code: 'SH'}, 
  {name: 'Saint Kitts and Nevis', code: 'KN'}, 
  {name: 'Saint Lucia', code: 'LC'}, 
  {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
  {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
  {name: 'Samoa', code: 'WS'}, 
  {name: 'San Marino', code: 'SM'}, 
  {name: 'Sao Tome and Principe', code: 'ST'}, 
  {name: 'Saudi Arabia', code: 'SA'}, 
  {name: 'Senegal', code: 'SN'}, 
  {name: 'Serbia and Montenegro', code: 'CS'}, 
  {name: 'Seychelles', code: 'SC'}, 
  {name: 'Sierra Leone', code: 'SL'}, 
  {name: 'Singapore', code: 'SG'}, 
  {name: 'Slovakia', code: 'SK'}, 
  {name: 'Slovenia', code: 'SI'}, 
  {name: 'Solomon Islands', code: 'SB'}, 
  {name: 'Somalia', code: 'SO'}, 
  {name: 'South Africa', code: 'ZA'}, 
  {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
  {name: 'Spain', code: 'ES'}, 
  {name: 'Sri Lanka', code: 'LK'}, 
  {name: 'Sudan', code: 'SD'}, 
  {name: 'Suriname', code: 'SR'}, 
  {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
  {name: 'Swaziland', code: 'SZ'}, 
  {name: 'Sweden', code: 'SE'}, 
  {name: 'Switzerland', code: 'CH'}, 
  {name: 'Syrian Arab Republic', code: 'SY'}, 
  {name: 'Taiwan, Province of China', code: 'TW'}, 
  {name: 'Tajikistan', code: 'TJ'}, 
  {name: 'Tanzania, United Republic of', code: 'TZ'}, 
  {name: 'Thailand', code: 'TH'}, 
  {name: 'Timor-Leste', code: 'TL'}, 
  {name: 'Togo', code: 'TG'}, 
  {name: 'Tokelau', code: 'TK'}, 
  {name: 'Tonga', code: 'TO'}, 
  {name: 'Trinidad and Tobago', code: 'TT'}, 
  {name: 'Tunisia', code: 'TN'}, 
  {name: 'Turkey', code: 'TR'}, 
  {name: 'Turkmenistan', code: 'TM'}, 
  {name: 'Turks and Caicos Islands', code: 'TC'}, 
  {name: 'Tuvalu', code: 'TV'}, 
  {name: 'Uganda', code: 'UG'}, 
  {name: 'Ukraine', code: 'UA'}, 
  {name: 'United Arab Emirates', code: 'AE'}, 
  {name: 'United Kingdom', code: 'GB'}, 
  {name: 'United States', code: 'US'}, 
  {name: 'United States Minor Outlying Islands', code: 'UM'}, 
  {name: 'Uruguay', code: 'UY'}, 
  {name: 'Uzbekistan', code: 'UZ'}, 
  {name: 'Vanuatu', code: 'VU'}, 
  {name: 'Venezuela', code: 'VE'}, 
  {name: 'Viet Nam', code: 'VN'}, 
  {name: 'Virgin Islands, British', code: 'VG'}, 
  {name: 'Virgin Islands, U.S.', code: 'VI'}, 
  {name: 'Wallis and Futuna', code: 'WF'}, 
  {name: 'Western Sahara', code: 'EH'}, 
  {name: 'Yemen', code: 'YE'}, 
  {name: 'Zambia', code: 'ZM'}, 
  {name: 'Zimbabwe', code: 'ZW'} 
].each do |item|
  country = Country.find_or_create_by(name: item[:name], code: item[:code])
  puts country.name
end

puts "\nCancellation Reasons\n\n"
cancel_reasons = [
  {order: 10, title: 'No longer required' },
  {order: 20, title: 'Reliability issues' },
  {order: 30, title: 'Too expensive' },
  {order: 40, title: 'Other' },
  {order: 50, title: 'Performance issues' },
  {order: 60, title: 'Unable to get the software working' },
].each do |item|
  cancel_reason = CancelReason.find_or_create_by(order: item[:order], title: item[:title])
  puts cancel_reason.try(:title)
end


puts "\nTickets\n\n"
users = []
plan = TariffPlan.first
users << User.find_or_create_by(email:'user@ex.com', password:'123', role:0, tariff_plan: plan)
users << User.find_or_create_by(email:'manager@ex.com', password:'123', role:1, tariff_plan: plan)
users << User.find_or_create_by(email:'admin@ex.com', password:'123', role:2, tariff_plan: plan)
departments = []
departments << Department.find_or_create_by(order:10, title:'Billing', email:"VegaVPN <billing@#{Rails.application.config.host}>")
departments << Department.find_or_create_by(order:20, title:'Sales', email:"VegaVPN <sales@#{Rails.application.config.host}>")
departments << Department.find_or_create_by(order:30, title:'Support', email:"VegaVPN <support@#{Rails.application.config.host}>")
tickets = [
  {title: 'Ticket 1'}, 
  {title: 'Ticket 2'}, 
  {title: 'Ticket 3'}
].each do |item|
  departments.each do |department|
    users.each do |user|
      ticket = Ticket.find_or_create_by(title:item[:title], user_id: user.id, department: department)
      puts "#{department.title} #{user.email}: #{ticket.title}"
    end
  end
end


puts "\nInvoices\n\n"
User.all.each do |user|
  Invoice.create({ no: '1000', title: plans.try(:first).try(:title), amount: 6.99, currency: '$', status: 'pay', user_id: user.id })
end

puts "\nNotifications\n\n"
User.all.each do |user|
  (0..25).map { |no| user.messages.create(title: "Notification #{no}") }
end