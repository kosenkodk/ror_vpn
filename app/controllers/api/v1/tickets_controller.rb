class Api::V1::TicketsController < Api::V1::ApiController
  before_action :authorize_access_request!
  before_action :set_item, only: [:show, :update, :destroy]

  # GET /tickets
  def index
    @tickets = current_user.tickets.paginate(page: params[:page] || 1, per_page: params[:per_page]).order(id: :desc)
    render json: { 
      tickets: @tickets.as_json(
        include: {department: {only: [:id, :title]} },
        # except: [:text, :created_at, :updated_at]
      ),
      pages: @tickets.total_pages,
      page: @tickets.current_page,
      # , status: 401
    }
  end

  # GET /tickets/1
  def show
    render json: @ticket.as_json(
      methods: [:attachment_url, :attachment_name],
      include: {department: {only: [:id, :title]}})
  end

  def get_attachment_base64(params_base64)
    begin
      if params_base64.present? && params_base64[:file].present? && params_base64[:name].present? && params_base64[:type].present?
        attachmentUrl = params_base64[:file] # data:application/octet-stream;base64,FILE
        attachmentFileName =  params_base64[:name]
        attachmentContentType =  params_base64[:type]
        start = attachmentUrl.index(',') + 1
        attachment_base64_decoded = Base64.decode64 attachmentUrl[start..-1]
        
        file_name = "attachment_#{Time.zone.now.to_s}.png"
        file_dir = "#{Rails.root}/tmp/images"
        file_path = "#{Rails.root}/#{file_name}"
        FileUtils.mkdir_p(file_dir) unless File.exists?(file_dir)
        File.open(file_path, 'wb') do |f|
          f.write(attachment_base64_decoded)
        end
        
        file = File.open(file_path, 'rb')
        FileUtils.rm(file_path)
        return {io: file, filename: attachmentFileName, content_type: attachmentContentType}
      end
    rescue => exception
    end
    {}
  end

  # POST /tickets
  def create
    @ticket = current_user.tickets.build(item_params.except(:department, :attachment, :attachment2))
    department_id = params[:ticket][:department]

    attachment_error = ''
    begin
      file_params = self.get_attachment_base64(params[:ticket][:attachment2])
      @ticket.attachment.attach(file_params) if file_params.present?
      # @ticket.files.attach(io: File.open(path_to_file), filename: icon)
    rescue => exception
      attachment_error = I18n.t('api.errors.attachment_upload')
      render json: { error: attachment_error, status: 400 }
      return
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
