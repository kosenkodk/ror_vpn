class ErrorsController < ApplicationController
  def not_found
    render status: 404
  end

  def coming_soon
  end

  def unacceptable
  end

  def internal_error
  end
end
