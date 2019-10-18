class Ticket < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user
  belongs_to :department, required: false
  validates :title, presence: true

  enum status: { opened: 0, closed: 1 }

  has_one_attached :attachment
  has_many_attached :files
  
  def attachment_url
    rails_blob_path(self.attachment, only_path: true) if self.attachment.attached?
    # Rails.application.routes.url_helpers.rails_blob_path(self.icon, only_path: true) if self.try(:icon).try(:attached?)# && self.try(:icon).try(:image).try(:blob?)
  end

  def file_urls
    self.files.map { |item| rails_blob_path(item, only_path: true) }
  end
end
