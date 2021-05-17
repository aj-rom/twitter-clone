Rails.application.routes.draw do
  root 'posts#index'
  resources :posts
  post '/posts/:id', to: 'posts#new_comment', as: :new_comment
end
