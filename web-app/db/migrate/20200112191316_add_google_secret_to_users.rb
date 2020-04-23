class AddGoogleSecretToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :google_secret, :string
  end
end
