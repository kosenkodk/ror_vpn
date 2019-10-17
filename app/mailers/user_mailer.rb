class UserMailer < ApplicationMailer
  def reset_password(user)
    @user = user
    make_bootstrap_mail(to: @user.email, subject: 'Reset your password')
  end
  def signup(user)
    @user = user
    make_bootstrap_mail(to: @user.email, subject: 'Thank you for creating a VegaVPN account.')
  end
end
