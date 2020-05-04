class AddCountryToConfigs < ActiveRecord::Migration[6.0]
  def change
    add_reference :configs, :country, foreign_key: true
  end
end
