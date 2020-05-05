class Config < ApplicationRecord
  include Rails.application.routes.url_helpers
  
  belongs_to :country#, optional: true
  has_one_attached :ovpn, dependent: :destroy
  
  def url
    api_v1_config_url(self.id)
  end

  def attributes
    { id: id, country: country, title: title, vpn_host: vpn_host, status: status, url: url }
  end
end
