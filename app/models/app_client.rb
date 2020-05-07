class AppClient < ApplicationRecord
  def attributes
    { id: id, title: title, url: url }
  end
end
