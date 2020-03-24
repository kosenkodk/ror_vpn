class AddExpiredAtToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :expired_at, :datetime
  end
end
