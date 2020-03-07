class AddIsReadOnlyToPaymentMethods < ActiveRecord::Migration[6.0]
  def change
    add_column :payment_methods, :is_readonly, :boolean
  end
end
