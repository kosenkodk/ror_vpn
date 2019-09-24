class ReactStaticController < ApplicationController

  def index
    render layout: 'react_app'
    @csrf_token = form_authenticity_token
  end

  def hello_erb
    render layout: 'react_empty'
  end

  def react_hello
    @features = Feature.all
    # render component: 'Features', props: { features: @features }
  end

  def react_app
    render layout: 'react_empty'
    # render component: 'App'
  end

end
