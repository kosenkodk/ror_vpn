class AddPersistenceTokenToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :persistence_token, :string
  end
end
