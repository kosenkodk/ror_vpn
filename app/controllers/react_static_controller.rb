class ReactStaticController < ApplicationController
  def index
    @csrf_token = form_authenticity_token
  end

  def hello_erb
    render layout: 'empty'
  end
end
