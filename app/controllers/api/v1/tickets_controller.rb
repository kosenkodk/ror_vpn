class Api::V1::TicketsController < Api::V1::ApiController
  before_action :authorize_access_request!
  before_action :set_item, only: [:show, :update, :destroy]

  # GET /filter
  def filter
    if (params[:status].present?)
      @tickets = current_user.tickets.where(status: params[:status]).paginate(page: params[:page] || 1, per_page: params[:per_page]).order(id: :desc)
    else
      @tickets = current_user.tickets.paginate(page: params[:page] || 1, per_page: params[:per_page]).order(id: :desc)
    end
    render json: { 
      tickets: @tickets,
      pages: @tickets.try(:total_pages),
      page: @tickets.try(:current_page),
    }
  end

  # GET /tickets
  def index
    if (params[:status].present?)
      @tickets = current_user.tickets.where(status: params[:status]).paginate(page: params[:page] || 1, per_page: params[:per_page]).order(id: :desc)
    else
      @tickets = current_user.tickets.paginate(page: params[:page] || 1, per_page: params[:per_page]).order(id: :desc)
    end
    render json: { 
      tickets: @tickets,
      pages: @tickets.total_pages,
      page: @tickets.current_page,
      # , status: 401
    }
  end

  # GET /tickets/1
  def show
    render json: @ticket
  end

  # POST /tickets
  def create
    @ticket = current_user.tickets.build(item_params.except(:department, :attachments, :attachment, :attachment2))
    department_id = params[:ticket][:department]
    attachment_error = ''
    attachments = params[:ticket][:attachments]
    
    begin
      # ticket with single attachment uploading
      file_params = get_attachment_base64(params[:ticket][:attachment2])
      @ticket.attachment.attach(file_params) if file_params.present?

      # ticket with multiple attachments uploading
      if (attachments.present?)
        attachments.each do |attachment|
          file_params = get_attachment_base64(attachment) 
          @ticket.attachments.attach(file_params) if file_params.present?
          # @ticket.attachments.attach(io: File.open(path_to_file), filename: file_name)
        end
      end
    rescue => exception
      attachment_error = I18n.t('api.errors.attachment_upload')
      render json: { error: attachment_error, status: 400 }
      return
    end

    @ticket.save!

    begin
      message = Message.new(title: @ticket.title, text: @ticket.text, user_id: @ticket.user.id, ticket_id: @ticket.id)

      # message with single attachment uploading
      file_params = get_attachment_base64(params[:ticket][:attachment2])
      message.attachment.attach(file_params) if file_params.present?
      
      # message with multiple attachments uploading
      if (attachments.present?)
        attachments.each do |attachment|
          file_params = get_attachment_base64(attachment)
          message.attachments.attach(file_params) if file_params.present?
        end
      end

      message.save
      @ticket.messages << message

      send_notification(title: I18n.t('pages.tickets.create'), user_id: current_user.id, url: "/user/tickets/#{@ticket.id}") if @ticket && current_user
    rescue => exception
      render json: { error: "can't create a message", status: 400 }
      return
    end

    if (Department.exists?(department_id))
      department = Department.find(department_id)
      @ticket.update(department: department)
      begin
        TicketsMailer.notify_user_from(department.email, @ticket.user.email, @ticket).deliver_now
        TicketsMailer.notify_department_from(@ticket.user.email, department.email, @ticket).deliver_now
      rescue => exception
        render json: { error: "can't send an email", status: 400 }
        return
      end
    end
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
    params.require(:ticket).permit(:id, :title, :text, :status, :department, :attachment, :attachment2, :attachments)
  end
end
