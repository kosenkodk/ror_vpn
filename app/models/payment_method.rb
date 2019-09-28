class PaymentMethod < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_many_attached :icons
  
  def active_class
    ''
  end

  def icon_urls
    urls = []
    self.icons.each do |item|
      urls << rails_blob_url(item, host: Rails.application.config.host)#only_path: true)
       #if item.try(:attached?)# && item.try(:image).try(:blob?)
    end
    urls
  end
end
