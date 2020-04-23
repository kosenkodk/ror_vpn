class AddBankCardToPaymentMethods < ActiveRecord::Migration[6.0]
  def change
    add_reference :payment_methods, :bank_card, null: true, foreign_key: true
  end
end
