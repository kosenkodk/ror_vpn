class CreatePaymentGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :payment_groups do |t|

      t.timestamps
    end
  end
end
