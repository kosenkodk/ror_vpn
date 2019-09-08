module HomeHelper
  def get_img_and_class_by_active_item_index item, item_active_index
    image_name = item == item_active_index ? 'signup/on.png' : 'signup/off.png'
    active_class = item == item_active_index ? 'active' : ''
    return image_name, active_class
  end
end
