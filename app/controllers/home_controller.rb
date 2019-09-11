# frozen_string_literal: true

class HomeController < ApplicationController

  def index
    @plan_active_index = 0
    # @plans = TariffPlan.all
    @features = Feature.all
    @payment_method_item_active_index = 1
  end

  def pricing
    @plan_active_index = 0
    @plans = TariffPlan.all
  end
  
end
