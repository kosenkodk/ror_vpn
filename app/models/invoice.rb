class Invoice < ApplicationRecord
  belongs_to :user
  enum status: { pay: 0, paid: 1 }#, _scopes: false
end
