class TariffPlan < ApplicationRecord
  has_one :user
  def active_class
    ''
  end
end
