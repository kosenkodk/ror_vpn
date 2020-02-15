class CreateReferrals < ActiveRecord::Migration[6.0]
  def change
    create_table :referrals do |t|
      t.reference :user

      t.timestamps
    end
  end
end
