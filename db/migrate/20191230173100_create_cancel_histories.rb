class CreateCancelHistories < ActiveRecord::Migration[6.0]
  def change
    create_table :cancel_histories do |t|
      t.references :user
      t.references :cancel_reason
      t.text :text

      t.timestamps
    end
  end
end
