import Post from "./post";
const BACKEND_URL = 'http://localhost:3000/'

function renderCard(post) {
    const card = post.toCard()
    document.getElementById('posts').append(card)
}

function renderPosts(posts) {
    posts.forEach(e => renderCard(new Post(e.id, e.name, e.content, e.created_at, e.comments, e.likes)))
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

function likePost(id) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(id)
    }

    return fetch(`${BACKEND_URL}/posts/${id}`, config)
        .catch(e => console.log(e))
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

export { BACKEND_URL, submitTweet, likePost, addCommentToPost, fetchAllPosts }
