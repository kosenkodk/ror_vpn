Rails.application.routes.draw do
  resources :tariff_plans
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
  get '/react_hello', to: 'home#react_hello'

  resources :contacts
  # resource :auth
  # resources :user
  namespace :api do
    namespace :v1 do
      # get 'features', to: 'features#index'
      resources :features, only: [:index]
    end
  end


end
