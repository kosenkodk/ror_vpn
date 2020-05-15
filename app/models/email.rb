class Email < ApplicationRecord
  after_create :send_newsletter_to_users
  
  belongs_to :email_subscription, optional: true

  def send_newsletter_to_users
    if self.is_published
      puts "email title: #{title} users count: #{email_subscription.users.count}"
      email_subscription.users.each do |user|
        puts "email send to user: #{user.email}"
        UserMailer.newsletter(user, self, email_subscription).deliver_now
      end
    end
  end

end
