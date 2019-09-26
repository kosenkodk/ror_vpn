class ReactStaticController < ApplicationController
  layout 'react_app'
  def index
    @features = Feature.all
    @csrf_token = form_authenticity_token
  end
end
