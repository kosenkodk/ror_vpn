class Ticket < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user
  belongs_to :department, required: false
  validates :title, presence: true

  enum status: { opened: 0, closed: 1 }

  has_one_attached :attachment
  has_many_attached :files
  
  has_many :messages, as: :messageable, inverse_of: 'ticket'
  
  def attachment_path
    rails_blob_path(self.attachment, only_path: true) if self.attachment.attached?
    # Rails.application.routes.url_helpers.rails_blob_path(self.icon, only_path: true) if self.try(:icon).try(:attached?)# && self.try(:icon).try(:image).try(:blob?)
  end

  # for email
  def url
    url = root_url(host: Rails.application.config.host)
    "#{url}user/tickets/#{self.id}"
  end
  
  def attachment_url
    rails_blob_url(self.attachment, host: Rails.application.config.host) if self.attachment.attached?
  end

  def attachment_name
    self.attachment.blob.filename if self.attachment.attached?
  end

  def file_urls
    self.files.map { |item| rails_blob_path(item, only_path: true) }
  end

  def created_at_humanize
    self.created_at.try(:strftime,"%d %B %Y at %H:%M") #to_formatted_s(:short) #strftime("%Y-%m-%d %H:%M:%S %Z")
  end

  def as_json(options = nil)
    super(
      # only: [{created_at: self.created_at_humanize}, :id, :title, :text, :status, :department ],
      include: {
        department: {only: [:id, :title]},
        messages: {include: :user, methods: [:created_at_humanize, :attachment_url, :attachment_name]}
        # messages: {only: [:id, :title], methods: [:created_at_humanize]},
      },
      methods: [:created_at_humanize, :attachment_url, :attachment_name],
    ).merge(options || {})
  end
end
