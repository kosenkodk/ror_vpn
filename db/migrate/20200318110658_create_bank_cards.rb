class CreateBankCards < ActiveRecord::Migration[6.0]
  def change
    create_table :bank_cards do |t|
      t.belongs_to :user
      t.string :full_name
      t.string :card_no
      t.string :card_date
      t.integer :card_code
      t.belongs_to :country
      t.integer :zip_code

      t.timestamps
    end
  end
end
