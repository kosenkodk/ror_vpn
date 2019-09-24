Rails.application.routes.draw do
  resources :tariff_plans
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'
  get '/404', to: 'errors#not_found', as: :not_found
  get '/422', to: 'errors#unacceptable'
  get '/204', to: 'errors#coming_soon', as: :coming_soon
  get '/500', to: 'errors#internal_error'
  get '/login_get', to: 'auth#login', as: :login_get
  post '/login', to: 'auth#login_post', as: :login
  get '/signup', to: 'auth#signup', as: :signup
  post '/signup', to: 'auth#signup_post'
  get '/forgot', to: 'auth#forgot_pwd', as: :forgot_pwd
  # get '/reset/:code', to: 'auth#reset_pwd', as: :reset_pwd
  get '/reset', to: 'auth#reset_pwd', as: :reset_pwd
  get '/reset_pwd_success', to: 'auth#success', as: :reset_pwd_success
  get '/pricing', to: 'home#pricing', as: :pricing

  resources :contacts
  # resource :auth
  # resources :user
  namespace :api do
    namespace :v1 do
      # get 'features', to: 'features#index'
      resources :features, only: [:index, :show]
      post 'login', to: 'auth#login'
    end
  end

  get '/react_hello', to: 'react_static#react_hello'
  get '/react_app', to: 'react_static#react_app'
  get '/hello_erb', to: 'react_static#hello_erb'

  # Forward all requests (except root_path, Ajax and HTML Mime type requests) to ReactController#index but requests
  get '*page', to: 'react_static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  # root 'react_static#index'
end
