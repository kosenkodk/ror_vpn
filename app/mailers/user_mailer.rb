class UserMailer < ApplicationMailer
  def reset_password(user)
    # attachments.inline['logo_mail_black.png'] = File.read(File.join(Rails.root,'/app/assets/images/logo_mail_black.png'))
    @user = user
    make_bootstrap_mail(to: @user.email, subject: 'Reset your password')
  end
  def signup(user)
    @user = user
    make_bootstrap_mail(to: @user.email, subject: 'Thank you for creating a VegaVPN account.')
  end
end
