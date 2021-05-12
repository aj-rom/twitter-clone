# Twitter Clone
Just a basic twitter clone.

## Getting Started

1. Clone this repository
2. Open your command line interface and move into our new directory:
   1. `> cd twitter-clone`
3. Start up the backend server.
   1. `> cd backend`
   2. `> bundle install`
   3. `> rails s`
4. Go ahead and navigate to the [frontend directory](/frontend)  
5. Open up [index.html](/frontend/index.html)
6. Start interacting with the site!


## How This Is Different
* There is no user authentication and is only submitted via form data on the frontend
    * Thus no profile views are made and soley can view posts with related comments
    * Users cannot perform Update and Delete actions on their posts/comments
    
* Functionality on this site is limited soley to the C & R of CRUD operations.
    * With the exception of U (Update) when they like a certain post.