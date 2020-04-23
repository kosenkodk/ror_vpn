class CreateConfigs < ActiveRecord::Migration[6.0]
  def change
    create_table :configs do |t|
      t.string :title
      t.integer :status
      t.string :vpn_host
      
      t.timestamps
    end
  end
end
