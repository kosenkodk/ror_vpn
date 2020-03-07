class AddIsForSignUpToPaymentMethods < ActiveRecord::Migration[6.0]
  def change
    add_column :payment_methods, :is_for_signup, :boolean
  end
end
