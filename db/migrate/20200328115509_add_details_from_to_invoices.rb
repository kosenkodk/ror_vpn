class AddDetailsFromToInvoices < ActiveRecord::Migration[6.0]
  def change
    add_column :invoices, :details_from, :text
  end
end
