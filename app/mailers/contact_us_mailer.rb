class ContactUsMailer < ApplicationMailer
  def notify_user(email, contact_id)
    @contact_id = contact_id
    mail to: email, subject: 'Congrats with your new message!', body: "contact link: #{api_v1_contact_url(contact_id)}"
  end
  def notify_user_from(email_from, email_to, contact)
    @contact = contact
    # mail from: email_from, to: email_to, subject: 'Congrats with your new message!'#, body: "contact link: #{api_v1_contact_url(@contact.id)}"
    make_bootstrap_mail from: email_from, to: email_to, subject: 'Congrats with your new message!'#, body: "contact link: #{api_v1_contact_url(@contact.id)}"
  end
  def notify_admin(email, contact_id)
    mail to: email, subject: 'Contact Us. New message.', body: "contact link: #{api_v1_contact_url(contact_id)}"
  end
  def notify_department_from(email_from, email_to, contact)
    @contact = contact
    mail from: email_from, to: email_to, subject: 'Contact Us. New message.', body: "contact link: #{api_v1_contact_url(@contact.id)}"
  end
end
