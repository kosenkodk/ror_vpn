Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  get '/404', to: 'errors#not_found'
  # match '/404' => 'errors#not_found', via: :get, as: :not_found
  get '/422', to: 'errors#unacceptable'
  get '/200', to: 'errors#coming_soon'
  get '/500', to: 'errors#internal_error'
end
