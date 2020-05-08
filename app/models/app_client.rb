class AppClient < ApplicationRecord
  has_one_attached :icon, dependent: :destroy
  has_one_attached :icon_light, dependent: :destroy
  
  def attributes
    { id: id, title: title, url: url, icon_url: icon_url, icon_light_url: icon_light_url }
  end

  def icon_url
    Rails.application.routes.url_helpers.rails_blob_path(self.icon, only_path: true) if self.try(:icon).try(:attached?)
  end

  def icon_light_url
    Rails.application.routes.url_helpers.rails_blob_path(self.icon_light, only_path: true, disposition: "inline") if self.try(:icon_light).try(:attached?)
  end
end
