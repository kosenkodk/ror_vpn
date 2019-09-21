class ReactStaticController < ApplicationController
  def index
    @csrf_token = form_authenticity_token
  end
end
