require 'rails_helper'

RSpec.describe 'Api::V1:TicketsController', type: :feature, js: true do
  describe 'Tickets' do
    let!(:user) {create(:user, role: 0)}
    let!(:ticket) {create(:ticket, title: 'ticket 1', user: user)}

    context 'user' do
      before(:each) do
        fsign_in_as(user)
        # visit('/tickets')
      end

      it 'list' do
        expect(page).to have_content(ticket.title)
      end

      it 'view item'
      it 'add item to list'
      it 'delete item from list' do
        click_on('Delete', match: :first)
        expect(page).not_to have_content(ticket.title)
      end
      it 'edit item'
      it "quests can't see the user's tickets"
    end
  end
end