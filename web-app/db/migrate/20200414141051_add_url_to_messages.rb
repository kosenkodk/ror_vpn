class AddUrlToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :url, :text
  end
end
