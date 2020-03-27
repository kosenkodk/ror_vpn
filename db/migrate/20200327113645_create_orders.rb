class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.string :no
      t.float :amount
      t.string :currency
      t.integer :type
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
