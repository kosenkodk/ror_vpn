module HomeHelper
  
  def get_active_checkbox_icon
    'signup/on.png'
  end

  def get_inactive_checkbox_icon
    'signup/off.png'
  end

  def get_img_and_class_by_active_item_index item, item_active_index
    image_name = item == item_active_index ? 'signup/on.png' : 'signup/off.png'
    active_class = item == item_active_index ? 'active' : ''
    return image_name, active_class
  end
  
  def get_active_class_by_index index_current, index_active
    index_current == index_active ? 'active' : ''
  end

  def devide_on_two_collections collection
    if collection.count > 0
      half_size = collection.count/2
      collection_first_half = collection.slice(0..half_size-1)
      collection2_second_half = collection.slice(half_size..collection.count)
      return collection_first_half, collection2_second_half
    end
    return nil, nil
  end

end
