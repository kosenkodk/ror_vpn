class PaymentMethod < ApplicationRecord
  has_many_attached :icons
  def active_class
    ''
  end
end
