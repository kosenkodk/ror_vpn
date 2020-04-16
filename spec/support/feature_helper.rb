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
    expect(page).to have_selector('.alert', visible: :all)
    click_on(button_close)
    click_on(button_open)
    expect(page).not_to have_selector('.alert', visible: :all)
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

  def check_notification_with_title title 
    click_on_notification_popup
    # expect(page).to have_content(title)

    # visit('/user/notifications')
    find('#btn-view-all-notifications').click

    expect(page).to have_content(title)
  end
  
  def click_on_notification_popup
    find("#notification_popup").click
  end

  def click_on_cancel_account_link
    # click_on(I18n.t('pages.account.cancel.title'))
    find('#cancel_account_link').click
  end

  def select_by id_of_select_box, title#, id
    select(title, from: id_of_select_box)
    find('#'+id_of_select_box).select(title)
    # expect(find('#'+id_of_select_box).value.to_i).to eq(id)
  end

  def select_cancel_account_reason cancel_reason
    id_of_select_box = 'cancel_account_select_box'
    select(cancel_reason.title, from: id_of_select_box, match: :first)
    # find('#'+id_of_select_box).select(cancel_reason.title)
    # expect(find('#'+id_of_select_box).value.to_i).to eq(cancel_reason.id)
  end

  def bank_card_fillout_with items
    items.each do |key, value|
      expect(page).to have_field(key)
      fill_in key, with: value
    end
  end
  
  def bank_card_fillout
    expect(page).to have_field('full_name')
    expect(page).to have_field('card_no')
    expect(page).to have_field('card_date')
    expect(page).to have_field('card_code')
    expect(page).to have_field('country_code')
    expect(page).to have_field('zip_code')

    fill_in :full_name, with: 'Mr Test'
    fill_in :card_no, with: '1234123412341234'
    fill_in :card_date, with: DateTime.now.strftime('%m%y')
    fill_in :card_code, with: '123'
    # fill_in :country_code, with: 'country_code'
    fill_in :zip_code, with: '123123'
  end

  def alert_have_text text
    expect(page).to have_css('.alert', visible: :all, text: text)
 
    # it works for permanent alerts/flash messages
    # expect(find('.alert')).to have_text(text)

    # if alert is hidden
    # expect(page).to have_css('.alert', visible: :hidden, text: text)
    # # to wait for alert to be removed from the dom
    # expect(page).not_to have_css('.alert', visible: :hidden, text: text)
    
    # # workaround for capybara < 2.11.0 
    # alert = page.find('.alert', visible: :all, text: text)
    # expect(alert).to match_css('.alert', visible: :hidden)
  end
end