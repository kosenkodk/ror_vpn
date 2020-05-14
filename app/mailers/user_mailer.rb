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
    make_bootstrap_mail(to: email, subject: 'Referral link for VegaVPN account.')
  end
  def invoice(user, invoice)
    @user = user
    @invoice = invoice
    make_bootstrap_mail(to: @user.email, subject: "[Vega VPN] Invoice ##{@invoice.no} notification")
  end
  def newsletter(user, email, email_subscription)
    @user = user
    @email = email
    @email_subscription = email_subscription
    make_bootstrap_mail(to: @user.email, subject: "[Vega VPN] #{@email.title}")
  end
end
