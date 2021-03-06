class PaymentMethod < ApplicationRecord
  include Rails.application.routes.url_helpers
  # scope :for_signup, -> { where(is_for_signup: true) }
  validates :title, presence: true
  has_one :user
  has_one_attached :icon, dependent: :destroy
  has_many_attached :icons, dependent: :destroy
  # has_many :bank_cards, dependent: :destroy
  belongs_to :bank_card, optional: true, dependent: :destroy

  # belongs_to :payment_method_group, optional: true
  # has_and_belongs_to_many :payment_method_groups

  def active_class
    ''
  end

  def icon_url
    rails_blob_url(self.icon) if self.icon.attached?
  end

  def icon_urls
    self.icons.map { |item| rails_blob_path(item, only_path: true) }
  end

  def self.for_signup
    where(is_for_signup: true)
  end
end
