class CreateBlackListEmails < ActiveRecord::Migration[6.0]
  def change
    create_table :black_list_emails do |t|
      t.string :email

      t.timestamps
    end
  end
end
