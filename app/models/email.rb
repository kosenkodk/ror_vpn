class Email < ApplicationRecord
  after_create :send_newsletter_to_users
  
  belongs_to :email_subscription#, optional: true

  def send_newsletter_to_users
    self.email_subscription.emails.where(is_published: true).each do |email|
      self.email_subscription.users do |user|
        UserMailer.newsletter(user, email, self.email_subscription)
      end
    end
  end

end
