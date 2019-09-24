class ReactStaticController < ApplicationController
  def index
    @csrf_token = form_authenticity_token
  end

  def hello_erb
    render layout: 'empty'
  end

  def react_hello
    @features = Feature.all
    # render component: 'Features', props: { features: @features }
  end

  def react_app
    render layout: 'empty'
    # render component: 'App'
  end

end
