class ContactUsMailer < ApplicationMailer
  def notify_user(email, contact_id)
    @contact_id = contact_id
    mail to: email, subject: I18n.t('pages.contact_us.user.subject'), body: "contact link: #{api_v1_contact_url(contact_id)}"
  end
  def notify_user_from(email_from, email_to, contact)
    @contact = contact
    make_bootstrap_mail from: email_from, to: email_to, subject: I18n.t('pages.contact_us.user.subject')
  end
  def notify_admin(email, contact_id)
    mail to: email, subject: I18n.t('pages.contact_us.admin.subject'), body: "contact link: #{api_v1_contact_url(contact_id)}"
  end
  def notify_department_from(email_from, email_to, contact)
    @contact = contact
    make_bootstrap_mail from: email_from, to: email_to, subject: I18n.t('pages.contact_us.department.subject')
  end
end
