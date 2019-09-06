require "rails_helper"

RSpec.describe ContactUsMailer, type: :mailer do
  include Rails.application.routes.url_helpers

  let(:contact_id) { 1 }

  context 'notify user' do
    let(:email) { ContactUsMailer.notify_user('user@email.ru', contact_id).deliver_now }
    
    it 'with correct email' do
      expect(email.to).to include('user@email.ru')
    end

    it 'with correct subject' do
      expect(email.subject).to eq('Congrats with your new message!')
    end

    it 'with contact link in body message' do
      expect(email.body.to_s).to include(contact_url(contact_id))
    end

    it 'with not empty email template'
  end

  context 'notify admin' do
    let(:admin_email) { ContactUsMailer.notify_admin(Rails.application.credentials.admin_email || 'admin@email.ru', contact_id).deliver_now }
    
    it 'with correct email' do
      expect(admin_email.to).to include('admin@email.ru')
    end

    it 'with correct subject' do
      expect(admin_email.subject).to eq('Contact Us. New message.')
    end

    it 'with contact link in body message' do
      expect(admin_email.body.to_s).to include(contact_url(contact_id))
    end

  end
end
