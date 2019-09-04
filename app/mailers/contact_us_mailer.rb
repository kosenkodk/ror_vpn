class ContactUsMailer < ApplicationMailer
  def notify_user(email, contact_id)
    @contact_id = contact_id
    mail to: email, subject: 'Congrats with your new message!', body: "body: #{contact_url(contact_id)}"
  end
end
