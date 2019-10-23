# config/initializers/smtp.rb
# ActionMailer::Base.smtp_settings = {
#   address: 'smtp.sendgrid.net',
#   port: 587,
#   domain: 'vega.isit.su',
#   user_name: ENV['SENDGRID_USERNAME'],
#   password: ENV['SENDGRID_PASSWORD'],
#   authentication: :login,
#   enable_starttls_auto: true
# }
#if you are using the API key
ActionMailer::Base.smtp_settings = {
  address:        'smtp.sendgrid.net',
  domain:         Rails.application.config.host, #'vega.isit.su',
  port:            587,
  authentication: :plain,
  user_name:      Rails.application.credentials.sendgrid_api_key_name, #'apikey',
  password:       Rails.application.credentials.sendgrid_api_key, #ENV['SENDGRID_API_KEY']
}