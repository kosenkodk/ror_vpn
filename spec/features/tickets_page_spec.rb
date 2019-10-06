require 'rails_helper'

RSpec.describe 'Api::V1:TicketsController', type: :feature, js: true do
  describe 'Tickets' do
    let!(:user) {create(:user, role: 0)}
    let!(:ticket) {create(:ticket, user: user)}

    context 'user' do
      before(:each) do
        fsign_in_as(user)
        # visit('/tickets')
      end

      it 'list' do
        expect(page).to have_content(ticket.title)
      end

      it 'view item' do
        click_on(I18n.t('buttons.view'), match: :first)
        expect(page).to have_content(ticket.title)
        expect(page).to have_content(ticket.text)
      end

      it 'add item to list' do
        click_on(I18n.t('buttons.add'))
        fill_in :title, with: 'ticket 1'
        fill_in :text, with: 'text 1'
        click_on(I18n.t('buttons.save'))
        expect(page).to have_content('ticket 1')
        expect(page).to have_content('text 1')
      end

      it 'delete item from list' do
        click_on(I18n.t('buttons.delete'), match: :first)
        expect(page).not_to have_content(ticket.title)
      end

      it 'edit item'
      it "guests can't see the user's tickets"
    end
  end
end