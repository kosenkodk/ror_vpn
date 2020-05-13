class EmailSubscription < ApplicationRecord
  # belongs_to :user, optional: true
  # has_and_belongs_to_many :users

  has_many :users_email_subscriptions
  has_many :users, through: :users_email_subscriptions
end
