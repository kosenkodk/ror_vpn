class Ticket < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user
  belongs_to :department, required: false
  validates :title, presence: true

  enum status: { opened: 0, closed: 1 }

  has_one_attached :attachment, dependent: :destroy
  has_many_attached :attachments, dependent: :destroy
  has_many_attached :files, dependent: :destroy
  
  has_many :messages, as: :messageable, inverse_of: 'ticket', dependent: :destroy
  
  def attachment_path
    rails_blob_path(self.attachment, only_path: true) if self.attachment.attached?
    # Rails.application.routes.url_helpers.rails_blob_path(self.icon, only_path: true) if self.try(:icon).try(:attached?)# && self.try(:icon).try(:image).try(:blob?)
  end

  # for email
  def url
    url = root_url(host: Rails.application.config.host)
    "#{url}user/tickets/#{self.id}"
  end

  def attachmentList
    self.attachments.map { |item| { url: rails_blob_url(item), name: item.blob.filename, content_type: item.blob.content_type } }
  end

  def attachment_url
    rails_blob_url(self.attachment) if self.attachment.attached?
  end

  def attachment_name
    self.attachment.blob.filename if self.attachment.attached?
  end

  def file_urls
    self.files.map { |item| rails_blob_path(item, only_path: true) }
  end

  def created_at_humanize
    self.created_at.try(:strftime, "%d/%m/%y %H:%M")#.try(:strftime, "%d %B %Y at %H:%M") #to_formatted_s(:short) #strftime("%Y-%m-%d %H:%M:%S %Z")
  end

  def as_json(options = nil)
    super(
      # only: [{created_at: self.created_at_humanize}, :id, :title, :text, :status, :department ],
      include: {
        department: {only: [:id, :title]},
        messages: {
          only: [:id, :text],
          include: :user, 
          methods: [:created_at_humanize, :attachment_url, :attachment_name, :attachmentList]
        }
      },
      methods: [:created_at_humanize, :attachment_url, :attachment_name, :attachmentList
      ],
    ).merge(options || {})
  end
end
