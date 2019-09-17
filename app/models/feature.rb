# frozen_string_literal: true

class Feature < ApplicationRecord
  has_one_attached :icon
  # attr_accessor :icon_url
  def icon_url
    Rails.application.routes.url_helpers.rails_blob_path(self.icon, only_path: true)
  end
end
