class TicketsMailer < ApplicationMailer
  def notify_user_from(email_from, email_to, ticket)
    @ticket = ticket
    make_bootstrap_mail from: email_from, to: email_to, subject: I18n.t('pages.tickets.user.subject')
  end
  def notify_department_from(email_from, email_to, ticket)
    @ticket = ticket
    make_bootstrap_mail from: email_from, to: email_to, subject: I18n.t('pages.tickets.department.subject')
  end
end
