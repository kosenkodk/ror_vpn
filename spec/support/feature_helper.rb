module FeatureHelper
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

  def is_page_error is_page_error
    if is_page_error
      expect(page).to have_content('404')
      expect(page).to have_content('Oh no!!!')
      expect(page).to have_content('You’re either misspelling the URL or requesting a page that’s no longer here.')
      expect(page).to have_css('footer')
      expect(page).to have_css('.row.header')
    else
      expect(page).not_to have_content('404')
      expect(page).not_to have_content('Oh no!!!')
      expect(page).not_to have_content('You’re either misspelling the URL or requesting a page that’s no longer here.')
    end
  end
  
  def click_on_btn_back
    # click_on(I18n.t('buttons.back'))
    click_link('btn-back')
    # find('#btn-back').click
  end
  def click_on_ticket_first
    # click_on(I18n.t('buttons.view'), match: :first)
    find('.ticket-table-item', match: :first).click
  end
end