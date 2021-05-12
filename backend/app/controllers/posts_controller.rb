class PostsController < ApplicationController
  before_action :get_post, only: %i[show update]

  def index
    render json: PostSerializer.new(Post.all).to_h
  end

  def show
    if @post
      render json: PostSerializer.new(@post).to_h
    else
      render json: { message: 'Post could not be found.' }
    end
  end

  def update; end

  private

  def get_post
    @post ||= Post.find_by(id: params[:id])
  end

end
