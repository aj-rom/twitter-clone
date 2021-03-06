// Backend URL for our Rails Server
const BACKEND_URL = 'https://ajrom-twitter-clone.herokuapp.com/'

// Like Emoticons
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Temp Array to Cache our JSON objects of tweets (posts)
const POSTS = []

class Content {
    constructor(id, name, content, createdAt) {
        this.id = id
        this.name = name
        this.content = content
        this._createdAt = createdAt
    }

    createdAt() {
        let date = this._createdAt.substring(0, 10).split('-')
        return `( ${date[1]}/${date[2]}/${date[0]} )`
    }
}

class Post extends Content {
    constructor(id, name, content, createdAt, comments, likes) {
        super(id, name, content, createdAt);
        this.comments = comments
        this.likes = likes
        POSTS.push(this)
    }

    toModal() {
        let modal = document.getElementById('modal')
        modal.classList.remove('hidden')

        let article = document.createElement('article')
        article.classList.add('post-modal')
        article.id = this.id

        let h1 = document.createElement('h1')
        h1.textContent = this.name + " " + this.createdAt()

        let p = document.createElement('p')
        p.textContent = this.content

        let likes = document.createElement('div')
        likes.textContent = this.likes + ' Likes'

        const button = getCloseModalButton()
        const commentForm = getCommentForm(this)

        let header = document.createElement('header')
        header.append(h1, p, likes)
        if (this.comments.length > 0) {
            let ul = document.createElement('ul')
            let h4 = document.createElement('h4')
            h4.innerText = 'Comments'
            ul.classList.add('comments')
            this.comments.forEach(e => {
                let comment = new Comment(e.id, e.name, e.content, e.created_at)
                ul.append(comment.toListItem())
            })
            article.append(header, h4, ul, commentForm, button)
        } else {
            article.append(header, commentForm, button)
        }

        modal.append(article)

        return modal
    }

    toCard() {
        let card = document.createElement('div')
        card.id = this.id
        card.classList.add('card')

        let article = document.createElement('article')
        article.classList.add('post')

        let h2 = document.createElement('h2')
        h2.innerText = this.name + " " + this.createdAt()

        let p = document.createElement('p')
        p.innerText = this.content

        let span = this.likeButton()

        article.append(h2, p, span)
        card.append(article)

        card.addEventListener('click', () => this.toModal())

        return card
    }

    likeButton() {
        let span = document.createElement('span')
        span.textContent = EMPTY_HEART + " " + this.likes
        span.classList.add('heart')
        span.addEventListener('click', e => {
            // make sure we don't render modal content
            // so we stop the event from bubbling up to our card click event listener
            e.stopPropagation()
            likePost(this.id)
                // replace with filled in heart
                .then(() => span.textContent = FULL_HEART + " " + `${this.likes + 1}`)
                // immediately update our object to match the database
                .then(() => this.likes += 1)

        })

        return span
    }
}

class Comment extends Content {
    constructor(id, name, content, createdAt) {
        super(id, name, content, createdAt);
    }

    toListItem() {
        let li = document.createElement('li')
        li.classList.add('comment')

        let h4 = document.createElement('h4')
        h4.innerText = this.name + " " + this.createdAt()

        let p = document.createElement('p')
        p.innerText = this.content

        li.append(h4, p)
        return li
    }
}

// Modal Management
function clearModal() {
    const modal = document.getElementById('modal')
    modal.classList.add('hidden')
    modal.innerHTML = ""
}

function getCloseModalButton() {
    const button = document.createElement('button')
    button.textContent = 'Close'
    button.classList.add('danger')
    button.addEventListener('click', e => clearModal())

    return button
}

// Data Rendering
function renderCard(post) {
    const card = post.toCard()
    document.getElementById('posts').append(card)
}

function renderTweets(tweets) {
    tweets.forEach(e => renderCard(e))
}
function renderPosts(posts) {
    posts.forEach(e => renderCard(new Post(e.id, e.name, e.content, e.created_at, e.comments, e.likes)))
}

function fetchAllPosts() {
     fetch(BACKEND_URL)
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

function search() {
    const searchBar = document.getElementById('search-field')
    const submitButton = document.getElementById('search')

    submitButton.addEventListener('click', () => {
        const val = searchBar.value
        let tweets = POSTS.filter(e => e.content.includes(val))
        const posts = document.getElementById('posts')
        posts.innerHTML = ""
        renderTweets(tweets)
    })

}

search()