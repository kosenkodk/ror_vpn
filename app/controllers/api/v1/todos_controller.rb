class Api::V1::TodosController < ApplicationController
  before_action :authorize_access_request!
  before_action :set_todo, only: [:show, :update, :destroy]

  # GET /todos
  def index
    @todos = current_user.todos

    render json: @todos
  end

  # GET /todos/1
  def show
    render json: @todo
  end

  # POST /todos
  def create
    @todo = current_user.todos.build(todo_params)
    @todo.save!
    render json: @todo, status: :created, location: api_v1_todo_url(@todo)
  end

  # PATCH/PUT /todos/1
  def update
    @todo.update!(todo_params)
    render json: @todo
  end

  # DELETE /todos/1
  def destroy
    @todo.destroy
  end

  private

  def set_todo
    @todo = current_user.todos.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title)
  end
end
