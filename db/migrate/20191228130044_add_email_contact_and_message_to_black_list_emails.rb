class AddEmailContactAndMessageToBlackListEmails < ActiveRecord::Migration[6.0]
  def change
    add_column :black_list_emails, :email_contact, :string
    add_column :black_list_emails, :message, :text
  end
end
