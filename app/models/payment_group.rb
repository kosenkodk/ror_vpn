class PaymentGroup < ApplicationRecord
  has_many :payment_methods
end
