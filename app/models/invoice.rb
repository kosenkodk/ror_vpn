class Invoice < ApplicationRecord
  after_save_commit :check_status

  belongs_to :user
  enum invoice_type: { subscription: 0, cancellation: 1 }
  enum status: { pay: 0, paid: 1 }#, _scopes: false

  def created_at_humanize
    self.created_at.try(:strftime, "%d/%m/%y %H:%M")
  end

  def attributes
    { id: id, no: no, amount: amount, currency: currency, invoice_type: invoice_type, status: status, created_at_humanize: created_at_humanize, details_from: details_from }
  end
 
  private
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
