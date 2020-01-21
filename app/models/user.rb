
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors[attribute] << (options[:message] || "is invalid")
    end
  end
end

class User < ApplicationRecord
  include ActiveModel::Serializers::JSON
  has_secure_password
  has_many :tickets, dependent: :destroy
  has_many :todos, dependent: :destroy

  belongs_to :payment_method, required: false, optional: true #, inverse_of: :user
  belongs_to :tariff_plan, required: false, optional: true #, inverse_of: :user
  belongs_to :cancel_reason, required: false, optional: true #, inverse_of: :user

  enum role: %i[user manager admin].freeze

  # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: { case_sensitive: false }
  validates :email, presence: true, email: true, uniqueness: { case_sensitive: false }
  
  acts_as_google_authenticated column_name: :email, lookup_token: :salt, drift: 30, issuer: 'VegaVPN' # drift is the number of seconds that the client and server are allowed to drift apart (default is 5 seconds)

  before_save {|record| record.salt = SecureRandom.hex unless record.salt }
  after_create {|record| record.set_google_secret }

  def attributes
    { id: id, email: email, role: role, is2fa: is2fa, tariff_plan: tariff_plan, cancel_account_reason_text: cancel_account_reason_text }
  end

  def generate_password_token!
    begin
      self.reset_password_token = SecureRandom.urlsafe_base64
    end while User.exists?(reset_password_token: self.reset_password_token)
    self.reset_password_token_expires_at = 2.hours.from_now #1.day.from_now
    save!
  end

  def clear_password_token!
    self.reset_password_token = nil
    self.reset_password_token_expires_at = nil
    save!
  end
end

