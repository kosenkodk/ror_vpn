class Invoice < ApplicationRecord
  belongs_to :user
  enum invoice_type: { subscription: 0, cancellation: 1 }
  enum status: { pay: 0, paid: 1 }#, _scopes: false

  def created_at_humanize
    self.created_at.try(:strftime, "%d/%m/%y %H:%M")
  end

  def attributes
    { id: id, no: no, amount: amount, currency: currency, invoice_type: invoice_type, status: status, created_at_humanize: created_at_humanize, details_from: details_from }
  end
end
