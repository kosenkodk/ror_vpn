module ApplicationHelper
  def self.send_notification(title: '', text: '', user_id: '', url: '')
    message = Message.create(title: title, text: text, messageable_id: user_id, messageable_type: User, url: url) if user_id > 0
    socket = {type: 'message', message: message.as_json}
    ActionCable.server.broadcast "notifications:notifications_channel#{user_id}", socket
  end

  def get_attachment_base64(params_base64)
    begin
      if params_base64.present? && params_base64['file'].present? && params_base64['name'].present? && params_base64['type'].present?
        attachmentUrl = params_base64['file'] # data:application/octet-stream;base64,FILE
        attachmentFileName =  params_base64['name']
        attachmentContentType =  params_base64['type']
        start = attachmentUrl.index(',') + 1
        attachment_base64_decoded = Base64.decode64 attachmentUrl[start..-1]
        
        file_name = "attachment_#{Time.zone.now.to_s}.png"
        file_dir = "#{Rails.root}/tmp/images"
        file_path = "#{Rails.root}/#{file_name}"
        FileUtils.mkdir_p(file_dir) unless File.exists?(file_dir)
        File.open(file_path, 'wb') do |f|
          f.write(attachment_base64_decoded)
        end
        
        file = File.open(file_path, 'rb')
        FileUtils.rm(file_path)
        return {io: file, filename: attachmentFileName, content_type: attachmentContentType}
      end
    rescue => exception
      error = exception
    end
    {}
  end
end
