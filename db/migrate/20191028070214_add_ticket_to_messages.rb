class AddTicketToMessages < ActiveRecord::Migration[6.0]
  def change
    add_reference :messages, :ticket, null: false, foreign_key: true
  end
end
