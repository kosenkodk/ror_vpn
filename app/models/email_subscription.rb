class EmailSubscription < ApplicationRecord
  has_many :users_email_subscriptions
  has_many :users, through: :users_email_subscriptions
  has_many :emails
end
