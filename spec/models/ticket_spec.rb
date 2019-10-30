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

  it 'check humanize date time' do
    ticket = create(:ticket, user:user)

    created_at_short = ticket.created_at.strftime("%d %B %Y at %H:%M") # .to_formatted_s(:short)  # "04 Dec 00:00" # strftime("%Y-%m-%d %H:%M:%S %Z")
    expect(ticket.created_at_humanize).to eq(created_at_short)

    expect(ticket.to_json).to include created_at_short

    ticket_json = JSON.parse(ticket.to_json)
    # ticket_json = JSON.parse(ticket.as_json({}))
    expect(ticket_json['created_at_humanize']).to eq ticket.created_at_humanize
    expect(ticket_json['created_at_humanize']).to eq created_at_short

    expect(ticket_json.keys).to include 'created_at_humanize'
    expect(ticket_json.values).to include created_at_short
  end
end
