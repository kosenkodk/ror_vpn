class TariffPlansController < ApplicationController
  before_action :set_tariff_plan, only: [:show, :edit, :update, :destroy]

  # GET /tariff_plans
  # GET /tariff_plans.json
  def index
    @tariff_plans = TariffPlan.all
  end

  # GET /tariff_plans/1
  # GET /tariff_plans/1.json
  def show
  end

  # GET /tariff_plans/new
  def new
    @tariff_plan = TariffPlan.new
  end

  # GET /tariff_plans/1/edit
  def edit
  end

  # POST /tariff_plans
  # POST /tariff_plans.json
  def create
    @tariff_plan = TariffPlan.new(tariff_plan_params)

    respond_to do |format|
      if @tariff_plan.save
        format.html { redirect_to @tariff_plan, notice: 'Tariff plan was successfully created.' }
        format.json { render :show, status: :created, location: @tariff_plan }
      else
        format.html { render :new }
        format.json { render json: @tariff_plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tariff_plans/1
  # PATCH/PUT /tariff_plans/1.json
  def update
    respond_to do |format|
      if @tariff_plan.update(tariff_plan_params)
        format.html { redirect_to @tariff_plan, notice: 'Tariff plan was successfully updated.' }
        format.json { render :show, status: :ok, location: @tariff_plan }
      else
        format.html { render :edit }
        format.json { render json: @tariff_plan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tariff_plans/1
  # DELETE /tariff_plans/1.json
  def destroy
    @tariff_plan.destroy
    respond_to do |format|
      format.html { redirect_to tariff_plans_url, notice: 'Tariff plan was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tariff_plan
      @tariff_plan = TariffPlan.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tariff_plan_params
      params.require(:tariff_plan).permit(:title, :price, :duration, :price_duration, :price_duration_sale, :price_comment, :features)
    end
end
