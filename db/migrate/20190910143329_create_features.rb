class CreateFeatures < ActiveRecord::Migration[6.0]
  def change
    create_table :features do |t|
      t.integer :order
      t.string :title
      t.string :subtitle
      t.text :text
      t.boolean :is_published

      t.timestamps
    end
  end
end
