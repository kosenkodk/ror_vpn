class PaymentMethod < ApplicationRecord
  include Rails.application.routes.url_helpers
  # scope :for_signup, -> { where(is_for_signup: true) }

  has_one :user
  has_many_attached :icons
  # belongs_to :payment_method_group, optional: true
  # has_and_belongs_to_many :payment_method_groups

  def active_class
    ''
  end

  def icon_urls
    self.icons.map { |item| rails_blob_path(item, only_path: true) }
  end

  def self.for_signup
    where(is_for_signup: true)
  end
end
