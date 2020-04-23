Rails.application.routes.draw do
  # resources :tariff_plans
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # root 'home#index'
  # get '/404', to: 'errors#not_found', as: :not_found
  # get '/422', to: 'errors#unacceptable'
  # get '/204', to: 'errors#coming_soon', as: :coming_soon
  # get '/500', to: 'errors#internal_error'
  # get '/login_get', to: 'auth#login', as: :login_get
  # post '/login', to: 'auth#login_post', as: :login
  # get '/signup', to: 'auth#signup', as: :signup
  # post '/signup', to: 'auth#signup_post'
  # get '/forgot', to: 'auth#forgot_pwd', as: :forgot_pwd
  # # get '/reset/:code', to: 'auth#reset_pwd', as: :reset_pwd
  # get '/reset', to: 'auth#reset_pwd', as: :reset_pwd
  # get '/reset_pwd_success', to: 'auth#success', as: :reset_pwd_success
  # get '/pricing', to: 'home#pricing', as: :pricing
  # get '/react_hello', to: 'home#react_hello'
  # get '/react_app', to: 'home#react_app'

  namespace :api do
    namespace :v1 do
      resources :configs

      resources :assets
      get '/notifications', to: 'notifications#index'
      post '/notifications/read_all', to: 'notifications#read_all'

      get '/invoice_to_pdf', to: "invoices#to_pdf"
      resources :departments, only: [:index]
      resources :countries, only: [:index]
      
      # get 'features', to: 'features#index'
      resources :features, only: [:index, :show]
      resources :tariff_plans#, only: [:index, :show]
      resources :payment_methods, only: [:index, :show, :create, :destroy] 
      resources :invoices, only: [:index, :show, :update, :create] 
      get '/payment_methods_for_signup', to: "payment_methods#for_signup"
      resources :payment_groups, only: [:index]
      resources :contacts, only: [:new, :show, :create]
      
      # post 'refresh', controller: :refresh, action: :create
      post '/refresh', to: 'refresh#create'
      post '/signin', to: 'signin#create'
      post '/signin_check_credentials', to: 'signin#signin_check_credentials'
      post '/signin_check_code', to: 'signin#signin_check_code'
      post '/signup', to: 'signup#create'
      delete '/signin', to: 'signin#destroy'
      # delete 'signin', controller: :signin, action: :destroy
      get '/me', to: 'users#me'
      post '/change_plan', to: 'users#change_plan'

      # account page for logged in users
      get '/account_cancellation_reasons', to: 'account#account_cancellation_reasons'
      delete '/delete', to: 'account#delete'
      patch '/change_password', to: 'account#change_password'
      patch '/change_email', to: 'account#change_email'
      post '/cancel', to: 'account#cancel'
      
      # invite/refer friend
      get '/refer_friend/link', to: 'refer_friend#link'
      post '/refer_friend', to: 'refer_friend#create'
      
      resources :user_mfa_session
      # delete '/disable2fa', to: 'user_mfa_session#destroy'
      # post '/enable2fa', to: 'user_mfa_session#create'
      # get '/qrcode2fa', to: 'user_mfa_session#new'

      mount ActionCable.server, at: '/cable'

      resources :tickets do
        collection do
          get '/filter', action: :filter, as: :filter
        end
      end
      resources :todos
      resources :password_resets, only: [:create] do
        collection do
          get ':token', action: :edit, as: :edit
          patch ':token', action: :update
        end
      end

      namespace :admin do
        resources :users, only: [:index, :show, :update] do
          resources :tickets, only: [:index], controller: 'users/tickets'
          resources :todos, only: [:index], controller: 'users/todos'
        end
      end
    end
  end
  
  # Forward all requests (except root_path, Ajax and HTML Mime type requests) to ReactController#index but requests
  get '*page', to: 'react_static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root 'react_static#index'
end