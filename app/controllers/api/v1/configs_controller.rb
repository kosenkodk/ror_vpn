class Api::V1::ConfigsController < Api::V1::ApiController
  before_action :authorize_access_request!
  before_action :get_vpn_url
  
  def show
    id = params[:id].to_i
    if Config.exists?(id)
      item = Config.find(id)
      download_ovpn item
    end
  end

  private
  def download_ovpn config
    create_user(current_user)
    ca = get_ca
    post_tls_key(ca, config.vpn_host)
    ovpn_config = get_ovpn_config(config.vpn_host, current_user.email)
    filename = "#{config.vpn_host}.ovpn"
    config.ovpn.attach(io: StringIO.new(ovpn_config), filename: filename)
    send_data ovpn_config, filename: filename
  end

  def block_user

  end

  def create_user user
    url = "#{@vpn_url}/server/users/create"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    # http.use_ssl = true

    request = Net::HTTP::Post.new(uri.path, {'Content-Type' => 'application/json'})
    request.body = { username: user.email }.to_json

    response = http.request(request)
    body = response.body
    # body = JSON.parse(response.body)
  end

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
    # @vpn_url = Rails.application.credentials.config.vpn_url
    @vpn_url = Rails.application.credentials.vpn_url
    # @vpn_url = Rails.application.credentials.vpn[:url]
  end
end
