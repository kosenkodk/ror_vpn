require "rails_helper"

RSpec.describe ContactUsMailer, type: :mailer do
  include Rails.application.routes.url_helpers # it seems optional

  let(:contact_id) { 1 }
  let(:email) { ContactUsMailer.notify_user('author@email.ru', contact_id).deliver_now }

  it 'has correct email' do
    expect(email.to).to include('author@email.ru')
  end

  it 'has correct subject' do
    expect(email.subject).to eq('Congrats with your new message!')
  end

  it 'has contact link in body message' do
    expect(email.body.to_s).to include(contact_url(contact_id))
  end
end
