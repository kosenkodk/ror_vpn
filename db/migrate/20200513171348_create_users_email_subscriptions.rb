class CreateUsersEmailSubscriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :users_email_subscriptions, id: false do |t|
      t.belongs_to :user
      t.belongs_to :email_subscription
      t.timestamps
    end
  end
end
