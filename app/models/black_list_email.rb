class BlackListEmail < ApplicationRecord
  validates :email, uniqueness: true
end
