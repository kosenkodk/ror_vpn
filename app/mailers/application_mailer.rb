class ApplicationMailer < ActionMailer::Base
  # include Rails.application.routes.url_helpers
  add_template_helper(EmailHelper)
  # default from: 'from@example.com'
  # layout 'mailer'
  layout 'application-mailer'
end
