class CreateInvoices < ActiveRecord::Migration[6.0]
  def change
    create_table :invoices do |t|
      t.string :no, unique: true
      t.integer :invoice_type, default: 0
      t.integer :status, default: 0
      t.float :amount
      t.string :currency
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
