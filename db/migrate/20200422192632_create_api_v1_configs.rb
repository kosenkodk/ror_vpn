class CreateApiV1Configs < ActiveRecord::Migration[6.0]
  def change
    create_table :api_v1_configs do |t|
      t.string :title
      t.integer :status

      t.timestamps
    end
  end
end
