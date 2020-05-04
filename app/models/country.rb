class Country < ApplicationRecord
  has_one_attached :icon, dependent: :destroy
  
  def attributes
    { id: id, name: name, code: code, icon_url: icon_url }
  end

  def icon_url
    Rails.application.routes.url_helpers.rails_blob_url(self.icon, only_path: true) if self.try(:icon).try(:attached?)
  end
end
