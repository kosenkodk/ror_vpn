require 'rails_helper'

RSpec.describe VpnUser, type: :model do
  it do
    item = VpnUser.create(vpn_login: 'test@email.com', vpn_password: 'test', vpn_enabled: true)
    expect(item.vpn_enabled).to eq(true)
  end
end
