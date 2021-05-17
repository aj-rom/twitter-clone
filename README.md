# Twitter Clone
Just a basic twitter clone running on a Rails backend server using javascript fetch requests to manipulate and show data.

## Getting Started

### Production Environment
Test out the `production` environment by simply heading to the github pages site for this repo.

You can navigate their easily by clicking [here](https://aj-rom.github.io/twitter-clone/frontend/index.html)

### Local Environment
1. Clone this repository
2. Open your command line interface and move into our new directory:
   1. `> cd twitter-clone`
3. Start up the backend server.
   1. `> cd backend` - To move into our backend application directory.
   2. `> bundle install` - To install necessary gems.
   3. `> rails db:setup` - To setup and seed our database.
   4. `> rails start` or `> rails s` - Starts the Rails backend server.
4. Go ahead and navigate to the [frontend directory](/frontend)  
5. Change the `BACKEND_URL` to `http://localhost:3000` in the `index.js` file.
6. Open up [index.html](/frontend/index.html)
7. Start interacting with the site!


## How This Is Different
* There is no user authentication and is only submitted via form data on the frontend
    * Thus no profile views are made and soley can view posts with related comments
    * Users cannot perform Update and Delete actions on their posts/comments
    
* Functionality on this site is limited soley to the C & R of CRUD operations.
    * With the exception of U (Update) when they like a certain post.
    
## License
This project is open-sourced under the [MIT License](/LICENSE), feel free to do what you like with it.
