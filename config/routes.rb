Rails.application.routes.draw do
  mount Alchemy::Engine => '/alchemy_cms'

  # resources :tariff_plans
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  get '/404', to: 'errors#not_found', as: :not_found
  get '/422', to: 'errors#unacceptable'
  get '/204', to: 'errors#coming_soon', as: :coming_soon
  get '/500', to: 'errors#internal_error'
  get '/login', to: 'auth#login', as: :login
  get '/signup', to: 'auth#signup', as: :signup
  get '/forgot', to: 'auth#forgot_pwd', as: :forgot_pwd
  # get '/reset/:code', to: 'auth#reset_pwd', as: :reset_pwd
  get '/reset', to: 'auth#reset_pwd', as: :reset_pwd
  get '/reset_pwd_success', to: 'auth#success', as: :reset_pwd_success
  get '/pricing', to: 'home#pricing', as: :pricing
  resources :contacts
  # resource :auth
  # resources :user
end
