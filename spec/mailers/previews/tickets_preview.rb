# Preview all emails at http://localhost:3000/rails/mailers/tickets
class TicketsPreview < ActionMailer::Preview
  def notify_user_from
    file = File.read(File.join(Rails.root,'/tmp/logo.zip'))
    # attachments.inline['logo_mail_black.png'] = File.read(File.join(Rails.root,'/app/assets/images/logo_mail_black.png'))

    TicketsMailer.notify_user_from('', '', Ticket.new(title:'title', text:'text', user: User.new(email:'email@ex.com'), department: Department.new(title:'department')), file)
  end
  def notify_department_from
    file = File.read(File.join(Rails.root,'/tmp/logo.zip'))
    TicketsMailer.notify_department_from('', '', Ticket.new(title:'title', text:'text', user: User.new(email:'email@ex.com'), department: Department.new(title:'department')), file, '')
  end
end
