class Contact < ApplicationRecord
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  # validates :email, presence: true, uniqueness: true, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :message_short, presence: true
  has_many :messages, as: :messageable

  def as_json(options = nil)
    super(include: :messages).merge(options || {})
  end
end
