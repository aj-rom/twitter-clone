class Comment < ApplicationRecord
  belongs_to :post, dependent: true
end
