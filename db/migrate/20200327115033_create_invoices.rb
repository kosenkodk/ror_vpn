class CreateInvoices < ActiveRecord::Migration[6.0]
  def change
    create_table :invoices do |t|
      t.string :no
      t.integer :invoice_type
      t.integer :status
      t.float :amount
      t.string :currency
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
