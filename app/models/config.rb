class Config < ApplicationRecord
  has_one_attached :ovpn, dependent: :destroy
end
