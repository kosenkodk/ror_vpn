class Api::V1::ContactsController < Api::V1::ApiController

  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)
    # @contact.department = # TODO: will implement
    if @contact.save
      department = Department.find(@contact.department)
      ContactUsMailer.notify_department_from(@contact.email, department.email, @contact).deliver_now
      ContactUsMailer.notify_user_from(department.email, @contact.email, @contact).deliver_now
      # ContactUsMailer.notify_admin(Rails.application.credentials.admin_email, @contact.id).deliver_now

      notice = I18n.t('pages.contact_us.success_message')
      # flash[:notice] = notice
      render json: { notice: notice }
    else
      notice = @contact.errors.full_messages.join(', ') # capitalize
      # notice = @contact.errors.messages.map { |k, v| "#{k}: #{v.split(',').join(' & ')}" }.join("; ") #{ |k,v| "#{k}: #{v}" }.join(";") # custom with ; and & delimitters
      # flash[:error] = notice || I18n.t('pages.contact_us.error_message')
      render json: { error: notice || I18n.t('pages.contact_us.error_message'), status: 404 }
    end

  end

  def index
  end

  def show
    if Contact.exists?(params[:id])
      @contact = Contact.find(params[:id])
      # notice = 'Your message has been created'
      # flash[:notice] = notice
      render json: { contact: @contact, notice: I18n.t('pages.contact_us.success_message') }
    else
      render json: { error: I18n.t('pages.contact_us.error_message'), status: 404 }
    end
  end

  private
  def contact_params 
    params.require(:contact).permit(:id, :email, :title, :message, :message_short, :department)
  end

end
