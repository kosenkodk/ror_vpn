class AddRefCodeToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :ref_code, :string
  end
end
