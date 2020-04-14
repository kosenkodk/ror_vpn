class Message < ApplicationRecord
  default_scope { order('created_at DESC') }
  include Rails.application.routes.url_helpers
  
  belongs_to :messageable, polymorphic: true, optional: true
  belongs_to :user, class_name: 'User', foreign_key: 'user_id', optional: true
  belongs_to :ticket, class_name: 'Ticket', foreign_key: 'ticket_id', optional: true
  has_one_attached :attachment, dependent: :destroy
  has_many_attached :attachments, dependent: :destroy
  enum status: { unread: 0, read: 1 }#, _scopes: false

  def is_read
    self.read?
  end

  def self.is_read_all user
    Message.where(messageable: user).unread.count === 0
  end

  def self.read_all user
    Message.where(messageable: user).each {|message| message.update(status: statuses[:read])}
  end

  def attachmentList
    self.attachments.map { |item| {id: item.id, url: rails_blob_url(item), name: item.blob.filename, content_type: item.blob.content_type } }
  end

  def attachment_path
    rails_blob_path(self.attachment, only_path: true) if self.attachment.attached?
    # Rails.application.routes.url_helpers.rails_blob_path(self.icon, only_path: true) if self.try(:icon).try(:attached?)# && self.try(:icon).try(:image).try(:blob?)
  end
  
  def attachment_url
    # rails_blob_url(self.attachment, host: Rails.application.config.host) if self.attachment.attached?
    rails_blob_url(self.attachment) if self.attachment.attached?
  end

  def attachment_name
    self.attachment.blob.filename if self.attachment.attached?
  end

  def created_at_humanize
    self.created_at.try(:strftime,"%d %B %Y at %H:%M")
  end

  def as_json(options = nil)
    if self.user.present?
      super(only: [:title, :text, :status, :url],
        include: :user,
        methods: [:is_read, :attachment_url, :attachment_name, :created_at_humanize, :attachmentList]
      )#.merge(options || {})
    else
      super(only: [:title, :text, :status, :url],
        methods: [:is_read, :attachment_url, :attachment_name, :created_at_humanize, :attachmentList]
      )
    end
  end
end
