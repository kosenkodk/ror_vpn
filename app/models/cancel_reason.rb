class CancelReason < ApplicationRecord
  belongs_to :cancel_history, optional: true
end
