class Email < ApplicationRecord
  after_create :send_newsletter_to_users
  
  belongs_to :email_subscription, optional: true

  def send_newsletter_to_users
    email_subscription.emails.where(is_published: true).each do |email|
      puts "email title: #{email.title} users count: #{email_subscription.users.count}"
      email_subscription.users.each do |user|
        puts "email send to user: #{user.email}"
        UserMailer.newsletter(user, email, email_subscription)
      end
    end
  end

end
