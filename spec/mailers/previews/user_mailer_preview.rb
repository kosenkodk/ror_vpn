# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def reset_password
    @user = User.new(email: 'user@email.ru', reset_password_token: 'token')
    UserMailer.reset_password(@user).deliver_now
  end

  def signup
    @user = User.new(email: 'user@email.ru', reset_password_token: 'token')
    UserMailer.signup(@user).deliver_now
  end

  def refer_friend(email="friend@email.ru")
    @user = User.new(email: 'user@email.ru', reset_password_token: 'token')
    UserMailer.refer_friend(@user, email).deliver_now
  end

  def invoice
    @user = User.new(email: 'user@email.ru', reset_password_token: 'token')
    @invoice = Invoice.new(no: '123', user: @user)
    UserMailer.invoice(@user, @invoice).deliver_now
  end
end
