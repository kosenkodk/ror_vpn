class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)
    # @contact.department = # TODO: will implement
    if @contact.save
      # UserMailer.contact_created(current_user.email, @contact.id).deliver_now #TODO: will implement
      notice = 'Contact has been created'
      # flash[:notice] = notice
      redirect_to contact_path(@contact), notice: notice
    else
      notice = @contact.errors.full_messages.join(', ') # capitalize
      # notice = @contact.errors.messages.map { |k, v| "#{k}: #{v.split(',').join(' & ')}" }.join("; ") #{ |k,v| "#{k}: #{v}" }.join(";") # custom with ; and & delimitters
      # flash[:error] = notice
      # render :new, error: notice
      redirect_to new_contact_path, error: notice
    end

  end

  def index
  end

  def show
    if Contact.exists?(params[:id])
      @contact = Contact.find(params[:id])
      flash[:notice] = 'ok'
      # render plain: "ok contact #{@contact.email} #{@contact.title}", status: 200
    else
      flash[:error] = 'fail'
      # render plain: "fail contact is not found", status: 404
    end
  end

  private
  def contact_params 
    params.require(:contact).permit(:id, :email, :title, :message, :message_short, :department)
  end

end
