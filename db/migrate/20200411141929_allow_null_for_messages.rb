class AllowNullForMessages < ActiveRecord::Migration[6.0]
  def change
    change_column :messages, :user_id, :integer, :null => true
    # change_column_null :messages, :user_id, true
  end
end
