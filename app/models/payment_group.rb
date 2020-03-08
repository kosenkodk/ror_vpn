class PaymentGroup < ApplicationRecord
  has_many :payment_methods
  has_many_attached :icons, dependent: :destroy
end
