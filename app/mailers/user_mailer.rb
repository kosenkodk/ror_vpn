class UserMailer < ApplicationMailer
  def reset_password(user)
    @user = user
    make_bootstrap_mail(to: @user.email, subject: 'Reset your password')
  end
end
