import Post from './post'

// Backend URL for our Rails Server
const BACKEND_URL = 'http://localhost:3000/'

// Temp Array to Cache our JSON objects of tweets (posts)
const POSTS = []

// Data Rendering
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

function getCommentForm(post) {
    let h4 = document.createElement('h4')
    h4.innerText = 'Leave a Comment'

    let form = document.createElement('form')
    form.classList.add('comment-form')

    Formio.icons = 'fontawesome'
    Formio.createForm(form, getFormJSON("Comment", "Leave your thoughts here!",
        "The comments for this tweet.", true, post.id))
        .then(f => f.on('submit', sub => { addCommentToPost(sub.data).then(e => {
            document.querySelector('button.danger').click()

            let comment = sub.data
            const date = new Date();
            const ops = { minimumIntegerDigits: 2, useGrouping: false }
            comment.created_at = `${date.getFullYear()}-${(date.getMonth() + 1)
                .toLocaleString('en-US', ops)}-${date.getDate()
                .toLocaleString('en-US', ops)}`
            const id = parseInt(comment.post_id)
            let post = POSTS.find(e => e.id === id)
            post.comments.push(comment)
            post.toModal()
        })
    }))

    const div = document.createElement('div')
    div.classList.add('form-container')
    div.append(h4, form)
    return div
}

// Dynamic Method for Form.io implementation
function getFormJSON(label, placeholder, description, hidden = false, postId = 0) {

    // Form Settings
    const contentValidation = {
        "required": true,
        "maxLength": 500,
        "minLength": 5
    }
    const nameSettings = {
        "label": "Name",
        "labelPosition": "left-left",
        "placeholder": "Name",
        "description": "Your full name.",
        "tableView": true,
        "validate": {
            "required": true,
            "maxLength": 100,
            "minLength": 5
        },
        "key": "name",
        "type": "textfield",
        "input": true
    }
    const formSettings = {
        "pdf": {
            "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
            "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
        }
    }
    const submitButtonJson = {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
    }

    let json = {
        "display": "form",
        "settings": formSettings,
        "components": [
            nameSettings,
            {
                "label": label,
                "placeholder": placeholder,
                "description": description,
                "autoExpand": false,
                "tableView": true,
                "validate": contentValidation,
                "key": "content",
                "type": "textarea",
                "input": true
            }, submitButtonJson

        ]
    }

    if (hidden) {
        json.components.push({
            "label": "post_id",
            "defaultValue": postId.toString(),
            "key": "post_id",
            "type": "hidden",
            "input": true,
            "tableView": false
        })
    }

    return json
}

function renderNewTweetForm() {
    let modal = document.getElementById('modal')
    modal.classList.remove('hidden')

    let form = document.createElement('form')
    form.classList.add('new-tweet-form')

    Formio.icons = 'fontawesome'
    Formio.createForm(form,
        getFormJSON('Tweet', "Leave your thoughts here!",
            "The content for your tweet..."))
        .then(f => f.on('submit', sub => submitTweet(sub.data)
            .then(e => location.reload())))

    let button = getCloseModalButton()

    let div = document.createElement('div')
    div.classList.add('container')

    let h1 = document.createElement('h1')
    h1.textContent = 'Post a Tweet'

    div.append(h1, form, button)
    modal.append(div)
}

// CRUD Operations
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

function likePost(id) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(id)
    }

    return fetch(BACKEND_URL + `/posts/${id}`, config)
        .catch(e => handleError(e))
}

function handleError(e) {
    console.log("An error has occurred! We can't seme to communicate with our backend server at the moment.")
    console.log(e)
}

// DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
    fetchAllPosts()
})