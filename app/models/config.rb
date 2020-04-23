class Config < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :ovpn, dependent: :destroy
  
  def url
    api_v1_config_url(self.id)
  end

  def attributes
    { id: id, title: title, url: url }
  end
end
