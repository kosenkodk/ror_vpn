class UsersEmailSubscription < ApplicationRecord
  belongs_to :user
  belongs_to :email_subscription
end
