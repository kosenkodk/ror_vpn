require 'rails_helper'

RSpec.describe Api::V1::MessagesController, type: :controller do

  describe "POST #cable" do
    it 'reply message' do
      # expect { post :create, comment: { text: 'Cool!' } }.to have_broadcasted_to("comments").with(text: 'Cool!')    
      expect {
        post :create, params: { message: { text: 'Cool!' } } 
        # post :reply, params: { message: { message_text: 'Cool!' } } 
      }.to have_broadcasted_to("ticket_channel").with({message: { text: 'Cool!'}})
    end
    it 'load all messages (user and support messages) related to ticket'
  end

end
