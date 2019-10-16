class Ticket < ApplicationRecord
  belongs_to :user
  validates :title, presence: true

  enum department: { billing: 0, sales: 1, technical_support: 2 }
end
