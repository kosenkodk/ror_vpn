class DeleteUserFromEmailSubscriptions < ActiveRecord::Migration[6.0]
  def change
    remove_column :email_subscriptions, :user_id
  end
end
