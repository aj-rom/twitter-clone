class PostSerializer < ApplicationSerializer
  attributes :id, :name, :content, :likes, :created_at
  has_many :comments
end
