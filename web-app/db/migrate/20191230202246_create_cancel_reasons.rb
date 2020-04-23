class CreateCancelReasons < ActiveRecord::Migration[6.0]
  def change
    create_table :cancel_reasons do |t|
      t.integer :order
      t.string :title
      t.text :text

      t.timestamps
    end
  end
end
