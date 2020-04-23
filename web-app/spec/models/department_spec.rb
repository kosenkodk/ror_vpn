require 'rails_helper'

RSpec.describe Department, type: :model do
  it "create department" do
    item = Department.create(title: 'Title', email:'email@test.com', order:10)
    expect(item.title).to eq('Title')
  end
end
