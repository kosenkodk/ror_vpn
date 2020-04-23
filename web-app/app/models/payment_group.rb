class PaymentGroup < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_many :payment_methods
  has_many_attached :icons, dependent: :destroy
  
  def icon_urls
    self.icons.map { |item| rails_blob_path(item, only_path: true) }
  end
end
