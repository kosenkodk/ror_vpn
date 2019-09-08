module ApplicationHelper
  def signup_icon_active item, item_active
    image_name = item == item_active ? 'signup/on.png' : 'signup/off.png'
    active_class = item == item_active ? 'active' : ''
    return image_name, active_class
  end
end
