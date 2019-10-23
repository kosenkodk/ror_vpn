require "rails_helper"

RSpec.describe TicketsMailer, type: :mailer do
  include Rails.application.routes.url_helpers

  let(:ticket) { FactoryBot.create(:ticket, user: create(:user), department: create(:department)) }

  context 'notify user from' do
    let(:email) { TicketsMailer.notify_user_from('from@email.ru', 'to@email.ru', ticket).deliver_now }
    
    it 'with correct email from' do
      expect(email.from).to include('from@email.ru')
    end

    it 'with correct email to' do
      expect(email.to).to include('to@email.ru')
    end

    it 'with correct subject' do
      expect(email.subject).to eq(I18n.t('pages.tickets.user.subject'))
    end

    it 'with title, message, message short and email in body message' do
      expect(email.text_part.body.to_s).to have_text(ticket.title)
      # expect(email.text_part.body.to_s).to have_text(ticket.text)
      expect(email.text_part.body.to_s).to have_text(ticket.department.title)
      # expect(email.text_part.body.to_s).to have_text(ticket.attachment)

      expect(email.html_part.body.to_s).to have_text(ticket.title)
      # expect(email.html_part.body.to_s).to have_text(ticket.text)
      expect(email.html_part.body.to_s).to have_text(ticket.department.title)
      # expect(email.html_part.body.to_s).to have_text(ticket.attachment)
    end

    it 'with not empty email template'
  end

  context 'notify department from' do
    let(:email) { TicketsMailer.notify_department_from('from@email.ru', 'to@email.ru', ticket).deliver_now }
    
    it 'with correct email from' do
      expect(email.from).to include('from@email.ru')
    end

    it 'with correct email to' do
      expect(email.to).to include('to@email.ru')
    end

    it 'with correct subject' do
      expect(email.subject).to eq(I18n.t('pages.tickets.department.subject'))
    end

    it 'with title, message, message short and email in body message' do
      expect(email.text_part.body.to_s).to have_text(ticket.title)
      expect(email.text_part.body.to_s).to have_text(ticket.text)
      expect(email.text_part.body.to_s).to have_text(ticket.department.title)
      # expect(email.text_part.body.to_s).to have_text(ticket.attachment)

      expect(email.html_part.body.to_s).to have_text(ticket.title)
      expect(email.html_part.body.to_s).to have_text(ticket.text)
      expect(email.html_part.body.to_s).to have_text(ticket.department.title)
      # expect(email.html_part.body.to_s).to have_text(ticket.attachment)
    end

    it 'with not empty email template'
  end

end
