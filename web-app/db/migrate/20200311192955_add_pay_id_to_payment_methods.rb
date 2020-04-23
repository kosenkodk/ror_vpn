class AddPayIdToPaymentMethods < ActiveRecord::Migration[6.0]
  def change
    add_column :payment_methods, :pay_id, :string
  end
end
