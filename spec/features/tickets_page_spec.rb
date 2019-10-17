require 'rails_helper'

RSpec.describe 'Api::V1:TicketsController', type: :feature, js: true do
  describe 'Tickets' do
    let!(:user) {create(:user, role: 0)}
    let!(:ticket) {create(:ticket, user: user)}
    let!(:department_billing) {create(:department, title: 'Billing')}
    let!(:department_sales) {create(:department, title: 'Sales')}
    let!(:department_tech) {create(:department, title: 'Technical Support')}
    # let!(:ticket_billing) {create(:ticket, user: user, department: department_billing)}
    # let!(:ticket_sales) {create(:ticket, user: user, department: department_sales)}
    # let!(:ticket_tech) {create(:ticket, user: user, department: department_tech)}

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
        expect(page).to have_content(ticket.department)
      end

      xit 'delete item from list' do
        click_on(I18n.t('buttons.delete'), match: :first)
        expect(page).not_to have_content(ticket.title)
      end

      it 'add item with default department to list' do
        click_on(I18n.t('buttons.add'))
        
        fill_in :title, with: 'ticket 1'
        fill_in :text, with: 'text 1'
        click_on(I18n.t('buttons.submit'))

        expect(page).to have_content('ticket 1')
        expect(page).to have_content(department_billing.title)
        
        all('.btn-outline-info').last.click # click on last view item
        
        expect(page).to have_content('text 1')
        expect(page).to have_content(department_billing.title)
      end

      it 'add item with sales department to list' do
        click_on(I18n.t('buttons.add'))
        
        select(department_sales.title, from: 'departmentSelectBox') # find option by text
        # find("#departmentSelectBox").select("Sales") # find option by text
        # find("option[value='sales']").click # find option by value

        fill_in :title, with: 'ticket 1'
        fill_in :text, with: 'text 1'
        click_on(I18n.t('buttons.submit'))

        expect(page).to have_content('ticket 1')
        expect(page).to have_content(department_sales.title)
        
        all('.btn-outline-info').last.click # click on last view item
        
        expect(page).to have_content('text 1')
        expect(page).to have_content(department_sales.title)
      end

      xit 'edit item' do
        click_on(I18n.t('buttons.edit'), match: :first)
        fill_in :title, with: 'ticket 2'
        fill_in :text, with: 'text 2'
        # click_on(I18n.t('buttons.save'))
        click_on(I18n.t('buttons.submit'))

        expect(page).to have_content('ticket 2')
        click_on(I18n.t('buttons.view'), match: :first)
        expect(page).to have_content('text 2')
      end

      xit 'filled input fields of edit form' do
        click_on(I18n.t('buttons.edit'), match: :first) # :first, :smart, :prefer_exact, :one

        expect(page).to have_content(ticket.title)
        expect(page).to have_content(ticket.text)
      end
      
      it "select department drop down" do
        # select('Option', from: 'departmentSelectBox')
        # find("#departmentSelectBox").select("value")
      end

      it "attach file or image" do
        # attach_file('Image', '/path/to/image.jpg')
      end

      it "display ticket's status"

      it "searching tickets by title or text"

      
      it "guests can't see the user's tickets"
      it "pagination click on next page button"
      it "pagination click on prev page button"
      it "title can't be empty"
      it "view ticket > add comments"
      it "admins can edit and delete tickets - why delete ? - just change ticket's status"
      it "email user and selected department about ticket's status or new comment"
    end
  end
end