# frozen_string_literal: true

class Feature < ApplicationRecord
  has_one_attached :icon
  # delegate :filename, to: :icon, allow_nil: true
  # attr_accessor :icon_url
  def icon_url
    Rails.application.routes.url_helpers.rails_blob_path(self.icon, only_path: true) if self.icon.attached? && self.icon.image.blob?
  end
end
