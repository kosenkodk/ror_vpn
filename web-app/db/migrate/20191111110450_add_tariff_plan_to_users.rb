class AddTariffPlanToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :tariff_plan, null: true, foreign_key: true
  end
end
