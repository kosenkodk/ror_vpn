class ErrorsController < ApplicationController
  
  layout 'errors'

  def not_found
    render status: 404
  end

  def coming_soon
    render status: 200
  end

  def unacceptable
    render status: 402
  end

  def internal_error
    render status: 500
  end
end
