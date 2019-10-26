require 'rails_helper'

RSpec.describe 'Api::V1:TicketsController', type: :feature, js: true do
  let!(:user) {create(:user, role: 0)}
  let!(:ticket) {create(:ticket, user: user)}
  let!(:department_billing) {create(:department, title: 'Billing')}
  let!(:department_sales) {create(:department, title: 'Sales')}
  let!(:department_tech) {create(:department, title: 'Technical Support')}
  # let!(:ticket_billing) {create(:ticket, user: user, department: department_billing)}
  # let!(:ticket_sales) {create(:ticket, user: user, department: department_sales)}
  # let!(:ticket_tech) {create(:ticket, user: user, department: department_tech)}

  before(:each) do
    fsign_in_as(user)
    visit('/user/tickets')
  end

  describe 'GET #index - view all tickets' do
    context 'success' do
      it 'display ticket title' do
        expect(page).to have_content(ticket.title)
      end

      it "display ticket's status" do
        expect(page).to have_content('opened')
      end

      it "select department drop down" do
        click_on(I18n.t('buttons.add'))
        select(department_billing.title, from: 'departmentSelectBox')
        # find("#departmentSelectBox").select(department_billing.title)
        expect(find('#departmentSelectBox').value.to_i).to eq(department_billing.id)
        select(department_sales.title, from: 'departmentSelectBox')
        expect(find('#departmentSelectBox').value.to_i).to eq(department_sales.id)
        select(department_tech.title, from: 'departmentSelectBox')
        expect(find('#departmentSelectBox').value.to_i).to eq(department_tech.id)
      end

      it "attach file or image" do
        click_on(I18n.t('buttons.add'))
        fill_in :title, with: 'ticket with attachment'
        file = Rails.root.join('app','assets', 'images', 'logo.png')
        attach_file('attachment', file) # input element that has a name, id, or label_text
        click_on(I18n.t('buttons.submit'))
        
        # all('.btn-outline-info').last.click # click on last view item
        click_on(I18n.t('buttons.view'), match: :first)
        # click_on('ticket with attachment', match: :first)
        expect(page).to have_content('ticket with attachment')
        expect(page).to have_content('logo.png')
        # click_on('logo.png')
        ## visit page.find('img#myimage')[:src]
        # expect(page).to have_http_status(200) # Capybara::NotSupportedByDriverError:
      end
      it 'close ticket' do
        click_on(I18n.t('buttons.close'), match: :first)
        click_on(I18n.t('buttons.view'), match: :first)
        expect(page).to have_content('closed')
        expect(page).to have_content(I18n.t('pages.tickets.form.status'))
      end
      it "searching tickets by id/no, title or text"
      it "guests can't see the user's tickets"
    end
    context 'fail' do
    end
  end

  describe 'view ticket' do
    context 'success' do
      it 'when user click on close ticket button'
      it 'display title, text, department' do
        click_on(I18n.t('buttons.view'), match: :first)
        expect(page).to have_content(ticket.title)
        expect(page).to have_content(ticket.text)
        expect(page).to have_content(ticket.department)
      end
    end
    context 'fail' do
    end
  end

  describe 'add ticket' do
    context 'success' do
      it 'add item with default department to list' do
        click_on(I18n.t('buttons.add'))
        
        fill_in :title, with: 'ticket 1'
        fill_in :text, with: 'text 1'
        click_on(I18n.t('buttons.submit'))

        expect(page).to have_content('ticket 1')
        expect(page).to have_content(department_billing.title)
        
        # all('.btn-outline-info').last.click # click on last view item
        click_on(I18n.t('buttons.view'), match: :first)

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
        
        # all('.btn-outline-info').last.click # click on last view item
        click_on(I18n.t('buttons.view'), match: :first)
        
        expect(page).to have_content('text 1')
        expect(page).to have_content(department_sales.title)
      end
      
      xit 'with comments' do
        click_on(I18n.t('buttons.add'))
        fill_in :title, with: 'ticket with comment'
        fill_in :comment, with: 'comment'
        click_on(I18n.t('buttons.submit'))
        click_on('ticket with comment')
        expect(page).to have_content('ticket with comment')
        expect(page).to have_content('comment')
      end
    end
    context 'fail' do
      it "with empty title"
    end
  end

  describe 'edit ticket' do
    context 'success' do
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
    end
    context 'fail' do
      it "with empty title"
    end
  end


  describe 'delete ticket' do
    context 'success' do
      xit 'delete item from list' do
        click_on(I18n.t('buttons.delete'), match: :first)
        expect(page).not_to have_content(ticket.title)
      end
    end
    context 'fail' do
    end
  end

  describe 'pagination' do
    context 'success' do
      it 'pagination click on next page button' do
        # click_on('Next')
      end
      it 'pagination click on prev page button' do
        # click_on('Previous')
      end
    end
  end
  
  describe 'Tickets' do
    it "admins can edit and delete tickets - why delete ? - just change ticket's status"
    it "email user and selected department about ticket's status or new comment"
  end
end