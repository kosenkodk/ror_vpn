class AddIsReferBonusUsedToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :is_refer_bonus_used, :boolean
  end
end
