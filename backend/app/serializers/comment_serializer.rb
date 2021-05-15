class CommentSerializer < ApplicationSerializer
  attributes :id, :name, :content, :created_at
  belongs_to :post
end
