# Preview all emails at http://localhost:3000/rails/mailers/contact_us
class ContactUsPreview < ActionMailer::Preview
  def notify_user_from
    ContactUsMailer.notify_user_from('','',Contact.first)
  end
  def notify_department_from
    ContactUsMailer.notify_department_from('','',Contact.first)
  end
end
