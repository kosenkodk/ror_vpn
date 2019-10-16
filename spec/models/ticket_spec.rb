require 'rails_helper'

RSpec.describe Ticket, type: :model do
  let(:user) {create(:user)}
  let(:department) {create(:department, title:'Sales')}

  it 'assign user and department to ticket' do
    ticket = create(:ticket, title:'title', user: user, department: department)
    expect(ticket.title).to eq('title')
    expect(ticket.department).to eq(department)
    expect(ticket.department.title).to eq(department.title)
    expect(ticket.user).to eq(user)
  end
end
