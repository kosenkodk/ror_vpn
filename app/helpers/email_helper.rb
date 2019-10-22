module EmailHelper
  def email_image_tag(image, **options)
    attachments[image] = {
      data: File.read(Rails.root.join("app/assets/images/#{image}")),
      mime_type: "image/png",
      # encoding: "base64"
    }
    image_tag attachments[image].url, **options
  end

  def email_inline_image_tag(image, **options)
    attachments.inline[image] = {
      data: File.read(Rails.root.join("app/assets/images/#{image}")),
      mime_type: "image/png",
      # encoding: "base64"
    }
    image_tag attachments.inline[image].url, **options
  end
end