class CreateEmailSubscriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :email_subscriptions do |t|
      t.string :title
      t.text :text
      t.integer :interval

      t.timestamps
    end
  end
end
