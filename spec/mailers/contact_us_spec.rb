require "rails_helper"

RSpec.describe ContactUsMailer, type: :mailer do
  include Rails.application.routes.url_helpers

  let(:contact_id) { 1 }
  let(:contact) { FactoryBot.create(:contact) }

  context 'notify user' do
    let(:email) { ContactUsMailer.notify_user('user@email.ru', contact_id).deliver_now }
    
    it 'with correct email' do
      expect(email.to).to include('user@email.ru')
    end

    it 'with correct subject' do
      expect(email.subject).to eq(I18n.t('pages.contact_us.user.subject'))
    end

    it 'with contact link in body message' do
      expect(email.body.to_s).to include(api_v1_contact_url(contact_id))
    end

    it 'with not empty email template'
  end

  context 'notify user from' do
    let(:email) { ContactUsMailer.notify_user_from('from@email.ru', 'to@email.ru', contact).deliver_now }
    
    it 'with correct email from' do
      expect(email.from).to include('from@email.ru')
    end

    it 'with correct email to' do
      expect(email.to).to include('to@email.ru')
    end

    it 'with correct subject' do
      expect(email.subject).to eq(I18n.t('pages.contact_us.user.subject'))
    end

    it 'with title, message, message short and email in body message' do
      expect(email.text_part.body.to_s).to have_text(contact.email)
      expect(email.text_part.body.to_s).to have_text(contact.message)
      expect(email.text_part.body.to_s).to have_text(contact.message_short)
      expect(email.text_part.body.to_s).to have_text(contact.title)

      expect(email.html_part.body.to_s).to have_text(contact.email)
      expect(email.html_part.body.to_s).to have_text(contact.message)
      expect(email.html_part.body.to_s).to have_text(contact.message_short)
      expect(email.html_part.body.to_s).to have_text(contact.title)
    end

    it 'with not empty email template'
  end

  context 'notify department from' do
    let(:email) { ContactUsMailer.notify_department_from('from@email.ru', 'to@email.ru', contact).deliver_now }
    
    it 'with correct email from' do
      expect(email.from).to include('from@email.ru')
    end

    it 'with correct email to' do
      expect(email.to).to include('to@email.ru')
    end

    it 'with correct subject' do
      expect(email.subject).to eq(I18n.t('pages.contact_us.department.subject'))
    end

    it 'with title, message, message short and email in body message' do
      expect(email.text_part.body.to_s).to have_text(contact.email)
      expect(email.text_part.body.to_s).to have_text(contact.message)
      expect(email.text_part.body.to_s).to have_text(contact.message_short)
      expect(email.text_part.body.to_s).to have_text(contact.title)

      expect(email.html_part.body.to_s).to have_text(contact.email)
      expect(email.html_part.body.to_s).to have_text(contact.message)
      expect(email.html_part.body.to_s).to have_text(contact.message_short)
      expect(email.html_part.body.to_s).to have_text(contact.title)
    end

    it 'with not empty email template'
  end

  context 'notify admin' do
    # let(:admin_email) { ContactUsMailer.notify_admin(Rails.application.credentials.admin_email, contact_id).deliver_now }
    let(:admin_email) { ContactUsMailer.notify_admin('admin@email.ru', contact_id).deliver_now }
    
    it 'with correct email' do
      expect(admin_email.to).to include('admin@email.ru')
    end

    it 'with correct subject' do
      expect(admin_email.subject).to eq(I18n.t('pages.contact_us.admin.subject'))
    end

    it 'with contact link in body message' do
      expect(admin_email.body.to_s).to include(api_v1_contact_url(contact_id))
    end

  end
end
