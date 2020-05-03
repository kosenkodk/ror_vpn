class Api::V1::ConfigsController < Api::V1::ApiController
  before_action :authorize_access_request!
  before_action :get_vpn_url
  
  def show
    id = params[:id].to_i
    if Config.exists?(id)
      item = Config.find(id)
      download_ovpn item
      return
    end
    render json: {error: 'error'}, status: 404
  end

  def index
    items = Config.order(title: :asc)
    render json: {items: items}
  end

  private
  def download_ovpn config
    create_user(current_user)
    ca = get_ca
    post_tls_key(ca, config.vpn_host)
    ovpn_config = get_ovpn_config(config.vpn_host, current_user.email)
    filename = "#{config.vpn_host}.ovpn"
    config.ovpn.attach(io: StringIO.new(ovpn_config), filename: filename)
    # send_data ovpn_config, filename: filename, disposition: 'inline'
    send_data ovpn_config, filename: filename
  end

  def block_user

  end

  def create_user user
    if VpnUser.where(vpn_login:user.email).count == 0
      VpnUser.create(vpn_login:user.email, vpn_password: 'test', vpn_enabled: true)
    end
    # # create user via api
    # url = "#{@vpn_url}/server/users/create"
    # uri = URI(url)
    # http = Net::HTTP.new(uri.host, uri.port)
    # # http.use_ssl = true

    # request = Net::HTTP::Post.new(uri.path, {'Content-Type' => 'application/json'})
    # # request.body = { login: user.email, password: user }.to_json
    # request.body = { login: user.email }.to_json

    # response = http.request(request)
    # body = response.body
    # # body = JSON.parse(response.body)
  end

  def get_ca
    url = "#{@vpn_url}/ca"
    uri = URI(url)
    ca = Net::HTTP.get(uri)
  end

  def post_tls_key ca, host='localhost'
    url = "#{@vpn_url}/server/tls?remote=#{host}"
    uri = URI(url)
    
    ca_file_path = "/tmp/#{host}"
    File.write(ca_file_path, ca)
    ca_file = File.open(ca_file_path)
    
    http = Net::HTTP.new uri.host, uri.port
    request = Net::HTTP::Post.new uri
    form_data = [
      ['req', ca_file]
    ]
    request.set_form form_data, 'multipart/form-data'
    response = http.request request
    
    ca_file.close

    response.body
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
    @vpn_url = ENV.fetch('OPENVPN_PKI_URL', Rails.application.credentials.vpn_url)
    # @vpn_url = Rails.application.credentials.vpn[:url]
  end
end
