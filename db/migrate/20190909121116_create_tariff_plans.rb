class CreateTariffPlans < ActiveRecord::Migration[6.0]
  def change
    create_table :tariff_plans do |t|
      t.string :title
      t.float :price
      t.integer :duration
      t.float :price_duration
      t.float :price_duration_sale
      t.string :price_comment
      t.text :features

      t.timestamps
    end
  end
end
