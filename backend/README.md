# Backend Rails API

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
