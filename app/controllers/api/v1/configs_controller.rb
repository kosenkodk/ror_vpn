class Api::V1::ConfigsController < Api::V1::ApiController
  before_action :authorize_access_request!
  # require 'net/http'
  before_action :get_vpn_url
  
  def get
    Rails.application.config.vpn_url  
    # todo: create user on vpn server
    ca = get_ca
    post_tls_key ca
    ovpn_config = get_ovpn_config
    # sign_server_cert @$EASYRSA_PKI/reqs/${OPENVPN_HOST}.req
    filename = 'config.ovpn'
    config = Config.find_or_create_by(title: filename)
    config.ovpn.attach(io: StringIO.new(ovpn_config), filename: filename)

    send_data ovpn_config, filename: filename
  end

  private
  def get_ca
    url = "#{@vpn_url}/ca"
    uri = URI(url)
    ca = Net::HTTP.get(uri)
  end

  def post_tls_key ca, host='localhost'
    url = "#{@vpn_url}/server/tls?remote=#{host}"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    # http.use_ssl = true

    request = Net::HTTP::Post.new(uri.path, {'Content-Type' => 'application/json'})
    request.body = { req: ca }.to_json

    response = http.request(request)
    body = JSON.parse(response.body)
  end

  def get_ovpn_config host='localhost', username='user1'
    url = "#{@vpn_url}/client/ovpn?remote=#{host}&login=#{username}"
    uri = URI(url)
    config = Net::HTTP.get(uri)
  end

  def sign_server_cert reg_file
    url = "#{@vpn_url}/server/sign"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    # http.use_ssl = true

    request = Net::HTTP::Post.new(uri.path, {'Content-Type' => 'application/json'})
    request.body = { req: reg_file }.to_json

    response = http.request(request)
    body = JSON.parse(response.body)
  end

  private
  def get_vpn_url
    @vpn_url = Rails.application.credentials.vpn_url
    # @vpn_url = Rails.application.credentials.vpn[:url]
  end
end
