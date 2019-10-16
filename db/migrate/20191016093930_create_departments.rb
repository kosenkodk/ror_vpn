class CreateDepartments < ActiveRecord::Migration[6.0]
  def change
    create_table :departments do |t|
      t.integer :order
      t.string :title
      t.string :email

      t.timestamps
    end
  end
end
