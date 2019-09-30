class Api::V1::ContactsController < ApplicationController

  layout 'errors'

  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)
    # @contact.department = # TODO: will implement
    if @contact.save
      ContactUsMailer.notify_user(@contact.email, @contact.id).deliver_now
      ContactUsMailer.notify_admin("admin@email.ru", @contact.id).deliver_now
      # ContactUsMailer.notify_admin(Rails.application.credentials.admin_email, @contact.id).deliver_now

      notice = t('pages.contact_us.success_message')
      # flash[:notice] = notice
      render json: notice || t('pages.contact_us.success_message')
    else
      notice = @contact.errors.full_messages.join(', ') # capitalize
      # notice = @contact.errors.messages.map { |k, v| "#{k}: #{v.split(',').join(' & ')}" }.join("; ") #{ |k,v| "#{k}: #{v}" }.join(";") # custom with ; and & delimitters
      # flash[:error] = notice || t('pages.contact_us.error_message')
      render json: notice || t('pages.contact_us.error_message'), status: 404
    end

  end

  def index
  end

  def show
    if Contact.exists?(params[:id])
      @contact = Contact.find(params[:id])
      flash[:notice] = flash[:notice]
      # notice = 'Your message has been created'
      # flash[:notice] = notice
      # render plain: "ok contact #{@contact.email} #{@contact.title}", status: 200
      render json: t('pages.contact_us.success_message')
    else
      # flash[:error] = flash[:error]
      # render json: "fail contact is not found", status: 404\
      render json: t('pages.contact_us.error_message'), status: 404
    end
  end

  private
  def contact_params 
    params.require(:contact).permit(:id, :email, :title, :message, :message_short, :department)
  end

end
