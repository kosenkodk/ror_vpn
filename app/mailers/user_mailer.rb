class UserMailer < ApplicationMailer
  def reset_password(user)
    @user = user
    make_bootstrap_mail(to: @user.email, subject: 'Reset your password')
  end
  def signup(user)
    @user = user
    make_bootstrap_mail(to: @user.email, subject: 'Thank you for creating a VegaVPN account.')
  end
  def refer_friend(user, email)
    @user = user
    make_bootstrap_mail(to: email, subject: 'Referal link for VegaVPN account.')
  end
end
