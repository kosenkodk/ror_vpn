class ReactStaticController < ApplicationController
  layout 'react_app'
  def index
    @csrf_token = form_authenticity_token
  end
end
