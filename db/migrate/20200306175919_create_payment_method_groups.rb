class CreatePaymentMethodGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :payment_method_groups do |t|
      t.string :title
      t.integer :order
      t.boolean :is_on_main_page
      t.boolean :is_draft

      t.timestamps
    end
  end
end
