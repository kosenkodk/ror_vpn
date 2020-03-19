class CreateUserPaymentMethods < ActiveRecord::Migration[6.0]
  def change
    create_table :user_payment_methods do |t|
      t.belongs_to :user, null: false, required: false, foreign_key: true
      t.belongs_to :payment_method, null: false, required: false, foreign_key: true

      t.timestamps
    end
  end
end
