class AddMessagableInterfaceToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :messageable_id, :bigint
    add_column :messages, :messageable_type, :string
    add_index :messages, [:messageable_id, :messageable_type]
  end
end
