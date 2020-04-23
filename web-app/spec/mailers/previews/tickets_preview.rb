# Preview all emails at http://localhost:3000/rails/mailers/tickets
class TicketsPreview < ActionMailer::Preview
  def notify_user_from
    file = File.open(File.join(Rails.root, '/app/assets/images/logo_mail_black.png'), 'rb')
    ticket = Ticket.new(id: 1, title: 'title', text: 'text', user: User.new(email:'email@ex.com'), department: Department.new(title:'department'))
    ticket.attachment.attach(io: file, filename: File.basename(file), content_type: File.extname(file))
    TicketsMailer.notify_user_from('', '', ticket)
  end
  def notify_department_from
    TicketsMailer.notify_department_from('', '', Ticket.new(id:1,title:'title', text:'text', user: User.new(email:'email@ex.com'), department: Department.new(title:'department')))
  end
end
