module AuthHelper
  def sign_in_as(user)
    payload = { user_id: user.id, aud: [user.role] }
    session = JWTSessions::Session.new(payload: payload,
      # refresh_by_access_allowed: true,
      namespace: "user_#{user.id}"
    )
    tokens = session.login
    request.cookies[JWTSessions.access_cookie] = tokens[:access]
    request.headers[JWTSessions.csrf_header] = tokens[:csrf]
  end
  
  def fsign_in_as(user)
    visit('/signin')
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    click_on(I18n.t('buttons.login'))
    if (user.is2fa)
      let(:code2fa) { ROTP::TOTP.new(user.google_secret).now }
      fill_in :code2fa, with: code2fa
      click_on(I18n.t('buttons.signin_securely'))
      # expect(page).to have_content(I18n.t('nav_menu.sign_out'))
    end
  end

  def fsign_up_as(user)
    visit('/signup')
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    fill_in :password_confirmation, with: user.password_confirmation
    click_on(I18n.t('buttons.continue'))
  end

end
