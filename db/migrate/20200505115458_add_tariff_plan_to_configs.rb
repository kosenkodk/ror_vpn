class AddTariffPlanToConfigs < ActiveRecord::Migration[6.0]
  def change
    add_reference :configs, :tariff_plan, foreign_key: true
  end
end
