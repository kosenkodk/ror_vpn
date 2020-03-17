class AddUserIdToPaymentMethods < ActiveRecord::Migration[6.0]
  def change
    add_reference :payment_methods, :user, null: true, foreign_key: true
  end
end
