class PaymentMethod < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_many_attached :icons
  
  def active_class
    ''
  end

  def icon_urls
    self.icons.map { |item| rails_blob_path(item, only_path: true) }
  end
end
