# Preview all emails at http://localhost:3000/rails/mailers/tickets
class TicketsPreview < ActionMailer::Preview
  def notify_user_from
    TicketsMailer.notify_user_from('', '', Ticket.new(title:'title', text:'text', user: User.new(email:'email@ex.com'), department: Department.new(title:'department')))
  end
  def notify_department_from
    TicketsMailer.notify_department_from('', '', Ticket.new(title:'title', text:'text', user: User.new(email:'email@ex.com'), department: Department.new(title:'department')))
  end
end
