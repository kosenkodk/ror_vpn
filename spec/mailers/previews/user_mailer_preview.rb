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
end
