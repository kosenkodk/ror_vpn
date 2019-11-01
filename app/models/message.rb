class Message < ApplicationRecord
  default_scope { order('created_at DESC') }
  include Rails.application.routes.url_helpers
  
  belongs_to :messageable, polymorphic: true, optional: true
  belongs_to :user, class_name: 'User', foreign_key: 'user_id'
  belongs_to :ticket, class_name: 'Ticket', foreign_key: 'ticket_id'
  has_one_attached :attachment

  def attachment_path
    rails_blob_path(self.attachment, only_path: true) if self.attachment.attached?
    # Rails.application.routes.url_helpers.rails_blob_path(self.icon, only_path: true) if self.try(:icon).try(:attached?)# && self.try(:icon).try(:image).try(:blob?)
  end
  
  def attachment_url
    rails_blob_url(self.attachment, host: Rails.application.config.host) if self.attachment.attached?
  end

  def attachment_name
    self.attachment.blob.filename if self.attachment.attached?
  end

  def created_at_humanize
    self.created_at.try(:strftime,"%d %B %Y at %H:%M")
  end

  def as_json(options = nil)
    super(only:[:text],
      include: :user, 
      methods: [:attachment_url, :attachment_name, :created_at_humanize]
    ).merge(options || {})
  end
end
