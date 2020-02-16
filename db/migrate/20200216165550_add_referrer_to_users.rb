class AddReferrerToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :referrer, null: true, foreign_key: true
  end
end
