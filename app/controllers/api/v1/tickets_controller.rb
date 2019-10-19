class Api::V1::TicketsController < Api::V1::ApiController
  before_action :authorize_access_request!
  before_action :set_item, only: [:show, :update, :destroy]

  # GET /tickets
  def index
    @tickets = current_user.tickets
    render json: @tickets
    .as_json(
      include: {department: {only: [:id, :title]} },
    #   except: [:text, :created_at, :updated_at]
    )
    # , status: 401
  end

  # GET /tickets/1
  def show
    render json: @ticket.as_json(
      methods: [:attachment_url],
      include: {department: {only: [:id, :title]} })
  end

  # POST /tickets
  def create
    @ticket = current_user.tickets.build(item_params.except(:department, :attachment, :attachment2))
    department_id = params[:ticket][:department]
    attachment_error = ''
    begin
      attachmentUrl = params[:ticket][:attachment2][:file] # data:application/octet-stream;base64,FILE
      attachmentFileName =  params[:ticket][:attachment2][:name]
      start = attachmentUrl.index(',') + 1
      attachment_base64_decoded = Base64.decode64 attachmentUrl[start..-1]
      
      file_name = 'attachment.png'
      File.open(file_name, 'wb') do|f|
        f.write(attachment_base64_decoded)
      end

      @ticket.attachment.attach(io: File.open(file_name, 'rb'), filename: attachmentFileName)
      # @ticket.files.attach(io: File.open(path_to_file), filename: icon)
    
    rescue => exception
      # render json: {error: "can't upload your attachments", status: 404}
      # return
      attachment_error = "can't upload your attachments"
    end

    if (Department.exists?(department_id))
      department = Department.find(department_id)
      @ticket.department = department
      TicketsMailer.notify_user_from(department.email, @ticket.user.email, @ticket).deliver_now
      TicketsMailer.notify_department_from(@ticket.user.email, department.email, @ticket).deliver_now
    end
    @ticket.save!
    render json: @ticket, status: :created, error: attachment_error, notice: I18n.t('api.notices.item_added'), location: api_v1_ticket_url(@ticket)
  end

  # PATCH/PUT /tickets/1
  def update
    @ticket.update!(item_params)
    render json: @ticket
  end

  # DELETE /tickets/1
  def destroy
    @ticket.destroy
    render json: :ok
  end

  private

  def set_item
    @ticket = current_user.tickets.find(params[:id])
  end

  def item_params
    params.require(:ticket).permit(:id, :title, :text, :status, :department, :attachment, :attachment2)
  end
end
