class VpnUser
  include Mongoid::Document
  field :vpn_login, type: String
  field :vpn_password, type: String
  field :vpn_enabled, type: Mongoid::Boolean
end
