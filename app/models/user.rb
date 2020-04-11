
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ User.email_regex
      record.errors[attribute] << (options[:message] || "is invalid")
    end
  end
end

class User < ApplicationRecord
  include ActiveModel::Serializers::JSON
  has_secure_password
  has_many :tickets, dependent: :destroy
  has_many :todos, dependent: :destroy
  has_many :payment_methods, dependent: :destroy
  has_many :invoices, dependent: :destroy
  has_many :messages, as: :messageable, dependent: :destroy

  belongs_to :payment_method, required: false, optional: true #, inverse_of: :user
  belongs_to :tariff_plan, required: false, optional: true #, inverse_of: :user
  belongs_to :cancel_reason, required: false, optional: true #, inverse_of: :user
  belongs_to :country, optional: true

  enum role: %i[user manager admin].freeze

  # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: { case_sensitive: false }
  validates :email, presence: true, email: true, uniqueness: { case_sensitive: false }
  
  acts_as_google_authenticated column_name: :email, lookup_token: :salt, drift: 30, issuer: 'VegaVPN' # drift is the number of seconds that the client and server are allowed to drift apart (default is 5 seconds)

  before_save {|record| record.salt = SecureRandom.hex unless record.salt }
  after_create {|record| record.set_google_secret }

  def is_plan_yearly
    self.tariff_plan.title === 'Plan for 1 year' if self.tariff_plan
  end

  def is_plan_quartely
    self.tariff_plan.title === 'Quartely Plan' if self.tariff_plan
  end

  def is_plan_monthly
    self.tariff_plan.title === 'Plan for 1 month' if self.tariff_plan
  end
  
  def is_plan_free
    self.tariff_plan.title === 'Free' if self.tariff_plan
  end

  def self.email_regex
    /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  end

  def expired_at_int
    self.expired_at.try(:to_i) #.try(:strftime, "%d/%m/%y %H:%M")#.try(:strftime, "%d %B %Y at %H:%M") #to_formatted_s(:short) #strftime("%Y-%m-%d %H:%M:%S %Z")
  end

  def expired_at_humanize
    self.expired_at.try(:strftime, "%d/%m/%y %H:%M")
  end

  def attributes
    { id: id, email: email, role: role, is2fa: is2fa, tariff_plan: tariff_plan, cancel_account_reason_text: cancel_account_reason_text, payment_methods: payment_methods, expired_at: expired_at, expired_at_humanize: expired_at_humanize, expired_at_int: expired_at_int, messages: messages }
  end
  
  def prolongate_on duration_time
    self.expired_at = DateTime.now() if !self.expired_at.present?
    self.expired_at = DateTime.now() if self.expired_at < 1.month.before # DateTime.now() - 1.month
    self.expired_at += duration_time
    # self.save!
    # save!
    save
  end

  def check_refer_bonus
    current_user = self
    if current_user.referrer_id && User.exists?(current_user.referrer_id)
      @user_referrer = User.find(current_user.referrer_id)
      @user_referrer.tariff_plan = current_user.tariff_plan if @user_referrer.is_plan_free
      if current_user.is_plan_yearly
        if !current_user.is_refer_bonus_used
          @user_referrer.prolongate_on(2.month)
          current_user.prolongate_on(2.month)
          current_user.is_refer_bonus_used = true
        end
      elsif current_user.is_plan_free
      else
        if !current_user.is_refer_bonus_used
          @user_referrer.prolongate_on(1.month)
          current_user.prolongate_on(1.month)
          current_user.is_refer_bonus_used = true
        end
      end
      if @user_referrer.save
        # todo: send success message to referrer
      else
        # todo: send error message to referrer
      end
    end
  end

  def generate_password_token!
    begin
      self.reset_password_token = SecureRandom.urlsafe_base64
    end while User.exists?(reset_password_token: self.reset_password_token)
    self.reset_password_token_expires_at = 2.hours.from_now #1.day.from_now
    save!
  end

  def get_refer_link
    "https://#{Rails.application.config.host}/signup/#{self.id}"
  end

  def clear_password_token!
    self.reset_password_token = nil
    self.reset_password_token_expires_at = nil
    save!
  end

  def self.check_invoices
    date = DateTime.now
    start_date = date.at_beginning_of_month
    end_date = date.at_end_of_month

    User.all.each do |user|
      user.update(expired_at: date) if user.expired_at.nil?
      if ((user.expired_at <= date) && !user.is_plan_free)
        invoices = Invoice.where(created_at: start_date..end_date, user_id: user.id)
        if invoices.count === 0
          if (user.tariff_plan)
            item = Invoice.create!(user_id: user.id, amount: user.tariff_plan.price, title: user.tariff_plan.title)
            item.generate_pdf
            item.save
          else
            item = Invoice.create!(user_id: user.id)
            item.generate_pdf
            # TODO: mail invoice to user
            item.save
          end
        end
      end
    end
  end
end

