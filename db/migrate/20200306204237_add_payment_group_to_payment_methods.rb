class AddPaymentGroupToPaymentMethods < ActiveRecord::Migration[6.0]
  def change
    add_reference :payment_methods, :payment_group
  end
end
