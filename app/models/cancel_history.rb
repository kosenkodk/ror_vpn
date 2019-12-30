class CancelHistory < ApplicationRecord
  belongs_to :user, optional: true #, required: false, optional: true
  has_many :cancel_reasons
end
