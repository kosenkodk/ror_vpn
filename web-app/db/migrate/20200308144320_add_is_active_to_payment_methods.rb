class AddIsActiveToPaymentMethods < ActiveRecord::Migration[6.0]
  def change
    add_column :payment_methods, :is_active, :boolean
  end
end
