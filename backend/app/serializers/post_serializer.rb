class PostSerializer < ApplicationSerializer
  attributes :id, :name, :content, :created_at
  has_many :comments
end
