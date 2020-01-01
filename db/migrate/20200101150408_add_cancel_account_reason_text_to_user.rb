class AddCancelAccountReasonTextToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :cancel_account_reason_text, :text
  end
end
