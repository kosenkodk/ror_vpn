class AddPaymentMethodToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :payment_method, null: true, foreign_key: true
  end
end
