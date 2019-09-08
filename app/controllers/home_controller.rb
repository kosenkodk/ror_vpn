# frozen_string_literal: true

class HomeController < ApplicationController

  def index
    @plan_active_index = 0
    @payment_method_item_active_index = 1
  end

  def pricing
    render layout: 'bg_fit_container'
  end
  
end
