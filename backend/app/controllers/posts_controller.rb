class PostsController < ApplicationController
  before_action :get_post, only: %i[show update]

  def index
    latest_posts = Post.order('created_at DESC')
    render json: PostSerializer.new(latest_posts).to_h
  end

  def show
    if @post
      render json: PostSerializer.new(@post).to_h
    else
      render json: { message: 'Post could not be found.' }
    end
  end

  def update
    @post.likes += 1
    @post.save
  end

  private

  def get_post
    @post ||= Post.find_by(id: params[:id])
  end

end
