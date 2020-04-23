class EmailProcessor
  def self.process(email)
    # create ticket from email
    # Ticket.create!({ title: email.from, text: email.body })
  end

  # def initialize(email)
  #   @email = email
  # end
  # def process
  #   email_to = Rails.configuration.x.email_to
  #   title = "VegaVPN. Request from #{@email.from[:full]}"
  #   UserMailer.notify_me(email_to, title, @email.body).deliver_now
  # end
end