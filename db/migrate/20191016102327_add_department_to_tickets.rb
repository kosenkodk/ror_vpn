class AddDepartmentToTickets < ActiveRecord::Migration[6.0]
  def change
    remove_column :tickets, :department

    change_table :tickets do |t|
      t.belongs_to :department
    end
  end
end
