class AddTicketToMessages < ActiveRecord::Migration[6.0]
  def change
    add_reference :messages, :ticket, null: true, foreign_key: true
  end
end
