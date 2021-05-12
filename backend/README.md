# Backend Rails API

This hold all of the backend related systems for the `twitter-clone`. Below is a description of models and their relations, as well as some other information on the backend systems.

--- 

## Models
All of the models with their associations.

### Post
* has a name field for the poster
* has a field for likes (integer)
* has many comments

### Comment
* Name field for the person leaving the comment
* Content field for the actual comment.
* Belongs to a Post

## Routes
```RUBY
    resource :posts, only: [:index, :show, :update]
```
