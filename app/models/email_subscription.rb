class EmailSubscription < ApplicationRecord
  belongs_to :user, optional: true
end
