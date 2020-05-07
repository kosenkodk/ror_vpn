class CreateAppClients < ActiveRecord::Migration[6.0]
  def change
    create_table :app_clients do |t|
      t.string :title
      t.string :url

      t.timestamps
    end
  end
end
