module ResponseHelper
  def response_json
    JSON.parse(response.body) rescue {}
  end

  def change_email_check_error
    expect(response_json.keys).to eq(['error'])
    expect(response_json['error']).to eq(error)
    expect(response).to have_http_status(422)
    expect(response.content_type).to eq('application/json; charset=utf-8')
  end
end