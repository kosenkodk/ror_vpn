class Ticket < ApplicationRecord
  belongs_to :user
  belongs_to :department, required: false
  validates :title, presence: true

  enum status: { opened: 0, closed: 1 }
  # enum department: { billing: 0, sales: 1, technical_support: 2 }
end
