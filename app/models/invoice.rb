class Invoice < ApplicationRecord
  include Rails.application.routes.url_helpers
  
  before_save :generate_pdf
  after_save_commit :check_status

  belongs_to :user
  enum invoice_type: { subscription: 0, cancellation: 1 }
  enum status: { pay: 0, paid: 1 }#, _scopes: false
  has_one_attached :pdf, dependent: :destroy

  def pdf_url
    rails_blob_url(self.pdf) if self.pdf.attached?
  end
  
  def created_at_humanize
    self.created_at.try(:strftime, "%d/%m/%y %H:%M")
  end

  def attributes
    { id: id, no: no, title: title, amount: amount, currency: currency, invoice_type: invoice_type, status: status, created_at_humanize: created_at_humanize, details_from: details_from, pdf_url: pdf_url }
  end
 
  def to_pdf
    @invoice = self
    layout = Erubis::Eruby.new(File.read(Rails.root.join('app/views/api/v1/invoices/invoice_pdf_layout.html.erb')))
    body = Erubis::Eruby.new(File.read(Rails.root.join('app/views/api/v1/invoices/invoice_pdf_body.html.erb')))
    body_html = body.result(binding)
    pdf_html = layout.result(body: body_html) # replace `yield` in layout with `body`
    # pdf_html = ActionController::Base.new.render_to_string(template: 'app/views/invoices/invoice.html.erb', layout: 'app/views/api/v1/invoices/invoice_pdf_layout.html')
    pdf = WickedPdf.new.pdf_from_string(pdf_html)

    # generate_pdf
  end

  private
  def generate_pdf
    filename = "invoice#{DateTime.try(:now).try(:strftime, "%d%m%Y")}.pdf"
    self.pdf.attach(io: StringIO.new(to_pdf), filename: filename)
    if self.user && self.user.tariff_plan
      self.title = self.user.tariff_plan.title
      self.amount = self.user.tariff_plan.price
      self.no = self.id # generate_invoice_no
    end
  end

  def generate_test_pdf
    pdf_html = """
    <div>
      <div className='row'>
        <div className='col-4 offset-4 text-center'>
          Vega VPN <br />
        123 Grienfield Drive<br />
        Yardville, NM 49990<br />
        (555) 555-0198<br />
        sale@vega.com<br />
        </div>
      </div>
      <div className='row mt-30'>
        <div className='col'>
          <NewLineToBr>#{self.details_from}</NewLineToBr>
        </div>
        <div className='col'>
          Invoice #: #{self.no}<br />
          Date: #{self.created_at_humanize}<br />
        </div>
      </div>

      <table className='table mt-30'>
        <thead>
          <tr>
            <th className='font-weight-bold'>Services</th>
            <th className='font-weight-bold'>Date</th>
            <th className='font-weight-bold'>Total</th>
          </tr>
        </thead>
        <tbody>
            <React.Fragment>
              <tr>
                <td>#{self.title}</td>
                <td>#{self.created_at_humanize}</td>
                <td>#{self.currency}#{self.amount}</td>
              </tr>
              <tr>
                <td colSpan='2' className='font-weight-bold'>Total</td>
                <td className='font-weight-bold'>#{self.currency}#{self.amount}</td>
              </tr>
            </React.Fragment>
        </tbody>
      </table>
    </div>
    """
    # pdf_html = ActionController::Base.new.render_to_string(template: 'app/views/invoices/invoice.html.erb', layout: 'app/views/api/v1/invoices/invoice_pdf_layout.html')
    pdf = WickedPdf.new.pdf_from_string(pdf_html)
    filename = "invoice#{DateTime.try(:now).try(:strftime, "%d%m%Y")}.pdf"
    self.pdf.attach(io: StringIO.new(pdf), filename: filename)
    return pdf
  end

  def check_status
    if self.status === 'paid'
      if self.user
        self.user.prolongate_on(1.month) 
        self.user.save
      end
      # TODO: send mail with 'Invoice was paid'
    end
  end
end
