class AddTitleToInvoices < ActiveRecord::Migration[6.0]
  def change
    add_column :invoices, :title, :string
  end
end
