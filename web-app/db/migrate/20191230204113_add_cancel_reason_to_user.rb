class AddCancelReasonToUser < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :cancel_reason, null: true, foreign_key: true
  end
end
