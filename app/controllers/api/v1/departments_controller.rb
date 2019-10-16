class Api::V1::DepartmentsController < Api::V1::ApiController
  # GET /departments
  def index
    items = Department.all
    render json: items
    .as_json(
      only: [:id, :title],
    #   except: [:text, :created_at, :updated_at]
    )
  end
end
