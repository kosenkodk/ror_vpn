class Invoice < ApplicationRecord
  belongs_to :user
  enum invoice_type: { subscription: 0, cancellation: 1 }
  enum status: { pay: 0, paid: 1 }#, _scopes: false
end
