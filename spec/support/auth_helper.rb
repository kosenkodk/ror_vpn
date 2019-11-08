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
  end

  def fsign_up_as(user)
    visit('/signup')
    fill_in :email, with: user.email
    fill_in :password, with: user.password
    fill_in :password_confirmation, with: user.password_confirmation
    click_on(I18n.t('buttons.continue'))
  end

  def is_coming_soon_page
    expect(page).to have_content(I18n.t('pages.coming_soon.subtitle'))
    expect(page).to have_content(I18n.t('pages.coming_soon.text'))
    expect(page).to have_css('.row.header')
    expect(page).to have_css('footer')
  end

  def check_clear_alerts_on_modal_close(button_open, button_save, button_close)
    click_on(button_open)
    click_on(button_save)
    expect(page).to have_selector('.alert')
    click_on(button_close)
    click_on(button_open)
    expect(page).not_to have_selector('.alert')
  end
end
