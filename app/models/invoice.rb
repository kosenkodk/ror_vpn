class Invoice < ApplicationRecord
  include Rails.application.routes.url_helpers

  before_save :add_invoice_details
  after_save_commit :check_status

  belongs_to :user#, optional: true
  enum invoice_type: { subscription: 0, cancellation: 1 }
  enum status: { pay: 0, paid: 1 }#, _scopes: false
  has_one_attached :pdf, dependent: :destroy

  def pdf_size
    self.try(:pdf).try(:blob).try(:byte_size) || 0
  end

  def pdf_url
    rails_blob_url(self.pdf) if self.pdf && self.pdf.attached?
  end
  
  def created_at_humanize
    self.created_at.try(:strftime, "%d/%m/%y %H:%M")
  end

  def attributes
    { id: id, no: no, title: title, amount: amount, currency: currency, invoice_type: invoice_type, status: status, created_at_humanize: created_at_humanize, details_from: details_from, pdf_url: pdf_url, pdf_size: pdf_size }
  end
 
  def to_pdf
    begin
      @invoice = self
      puts "to_pdf @invoice #{@invoice.title} #{@invoice.amount}"
      layout = Erubis::Eruby.new(File.read(Rails.root.join('app/views/api/v1/invoices/invoice_pdf_layout.html.erb')))
      body = Erubis::Eruby.new(File.read(Rails.root.join('app/views/api/v1/invoices/invoice_pdf_body.html.erb')))
      body_html = body.result(binding)
      pdf_html = layout.result(body: body_html) # replace `yield` in layout with `body`
      # pdf_html = ActionController::Base.new.render_to_string(template: 'app/views/invoices/invoice.html.erb', layout: 'app/views/api/v1/invoices/invoice_pdf_layout.html')
      pdf = WickedPdf.new.pdf_from_string(pdf_html)
    rescue StandardError => e
      puts e
    end
  end
  
  def generate_pdf
    puts 'generate_pdf'
    begin
      filename = "invoice#{DateTime.try(:now).try(:strftime, "%d%m%Y")}_#{self.no}.pdf"
      puts filename
      pdf = to_pdf
      # puts pdf
      self.pdf.attach(io: StringIO.new(to_pdf), filename: filename) if !Rails.env.test?
    rescue StandardError => e
      puts e
    end
  end

  private

  def add_invoice_details
    puts "add_invoice_details user_id #{self.user_id} #{user_id}"
    if User.exists?(user_id)
      user = User.find(user_id)
      puts "user exists #{user_id}"
      if user.tariff_plan
        puts "plan #{user.tariff_plan.title}"
        self.title = user.tariff_plan.title #if title.blank?
        self.amount = user.tariff_plan.price #if amount.blank?
      end
    end
    self.no = Invoice.count + 1 if no.blank? # generate_invoice_no
  end

  def check_status
    puts 'check_status'
    if self.status === 'paid'
      if self.user
        self.user.prolongate_on(1.month)
        self.user.check_refer_bonus
        # self.user.save
        ApplicationHelper.send_notification(title: I18n.t('pages.dashboard.plans.change.success'), user_id: self.user.id, url: "/user/dashboard")
      end
      # TODO: send mail with 'Invoice was paid'
    end
  end
end
