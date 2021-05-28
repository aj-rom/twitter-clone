# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :find_post, only: %i[show update new_comment]

  def index
    latest_posts = Post.order('created_at DESC').limit(10)
    render json: PostSerializer.new(latest_posts).to_h
  end

  def show
    if @post
      render json: PostSerializer.new(@post).to_h
    else
      render json: { message: 'Post could not be found.' }
    end
  end

  def create
    @post = Post.new(post_params)
    @post.save
  end

  def update
    @post.likes += 1
    @post.save
  end

  def new_comment
    @post.comments.build(comment_params)
    @post.save
  end

  private

  def find_post
    @post ||= Post.find_by(id: params[:id])
  end

  def comment_params
    params.permit(:post_id, :content, :name)
  end

  def post_params
    params.permit(:name, :content)
  end
end
