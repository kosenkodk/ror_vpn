class CreateReferrers < ActiveRecord::Migration[6.0]
  def change
    create_table :referrers do |t|
      t.reference :user

      t.timestamps
    end
  end
end
