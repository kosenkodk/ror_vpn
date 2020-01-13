class AddIs2FaToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :is2fa, :boolean, default: false
  end
end
