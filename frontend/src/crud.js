import Post from "./post";
import ReactDOM from 'react-dom'
const BACKEND_URL = 'http://localhost:3000/'

function renderPosts(posts) {
    const list = posts.map(e => <Post key={e.id} id={e.id} name={e.name} content={e.content} comments={e.comments} time={e.created_at} likes={e.likes}/>)
    ReactDOM.render(list, document.getElementById('posts'))
}

function fetchAllPosts() {
    return fetch(BACKEND_URL)
        .then(e => e.json())
        .then(e => renderPosts(e))
        .catch(e => handleError(e))
}

function submitTweet(data) {
    const conf = {
        headers: {
            "Content-Type": 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    }

    return fetch(BACKEND_URL + '/posts', conf)
}

function operateLike(id, val) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ id: id, val: val})
    }

    return fetch(`${BACKEND_URL}/posts/${id}`, config)
        .catch(e => console.log(e))
}

function unlikePost(id) {
    return operateLike(id, -1)
}

function likePost(id) {
    return operateLike(id, 1)
}

function addCommentToPost(comment) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(comment)
    }

    return fetch(BACKEND_URL + `/posts/${comment.post_id}`, config)
}

function handleError(e) {
    console.log("An error has occurred! We can't seme to communicate with our backend server at the moment.")
    console.log(e)
}

export { BACKEND_URL, submitTweet, likePost, unlikePost, addCommentToPost, fetchAllPosts }
