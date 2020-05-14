class CreateEmails < ActiveRecord::Migration[6.0]
  def change
    create_table :emails do |t|
      t.string :title
      t.text :text
      t.boolean :is_published
      t.belongs_to :email_subscription

      t.timestamps
    end
  end
end
