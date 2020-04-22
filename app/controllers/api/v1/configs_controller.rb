class Api::V1::ConfigsController < Api::V1::ApiController
  before_action :authorize_access_request!
  # require 'net/http'

  def get
    ca = get_ca
    post_tls ca
    config = get_ovpn_config

    send_data config, filename: 'config.ovpn'
  end

  private
  def get_ca
    url = 'http://localhost:5000/ca'
    uri = URI(url)
    ca = Net::HTTP.get(uri)
  end

  def post_tls ca, host='localhost'
    url = "http://localhost:5000/server/tls?remote=#{host}"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    # http.use_ssl = true

    request = Net::HTTP::Post.new(uri.path, {'Content-Type' => 'application/json'})
    request.body = { req: ca }.to_json

    response = http.request(request)
    body = JSON.parse(response.body)
  end

  def get_ovpn_config host='localhost', username='user1'
    url = "http://localhost:5000/client/ovpn?remote=#{host}&login=#{username}"
    uri = URI(url)
    config = Net::HTTP.get(uri)
  end
end
