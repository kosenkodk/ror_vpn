class VpnUser
  include Mongoid::Document
  store_in collection: "authentication", database: "vpnUsers"#, client: "secondary"
  
  # field :_id, type: String
  field :vpn_login, type: String
  field :vpn_password, type: String
  field :vpn_enabled, type: Mongoid::Boolean
end
