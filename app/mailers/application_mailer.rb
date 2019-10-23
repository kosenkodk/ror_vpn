class ApplicationMailer < ActionMailer::Base
  add_template_helper(EmailHelper)
  add_template_helper(ApplicationHelper)

  # default from: 'from@example.com'
  # layout 'mailer'
  layout 'application-mailer'
end
