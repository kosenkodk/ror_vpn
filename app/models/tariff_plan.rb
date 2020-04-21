class TariffPlan < ApplicationRecord
  has_one :user
  
  def active_class
    ''
  end

  def is_yearly
    self.title === 'Plan for 1 year'
  end

  def is_quartely
    self.title === 'Quarterly plan'
  end

  def is_monthly
    self.title === 'Plan for 1 month'
  end
  
  def is_free
    self.title === 'Free plan'
  end

  def attributes
    { is_yearly: is_yearly, is_quartely: is_quartely, is_monthly: is_monthly, is_free: is_free, id: id, title: title, price: price, duration: duration, price_duration: price_duration, price_duration_sale: price_duration_sale, price_comment: price_comment, features: features }
  end

end
