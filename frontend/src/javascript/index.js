const BACKEND_URL = 'http://localhost:3000'
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

class Content {
    constructor(name, content, createdAt) {
        this.name = name
        this.content = content
        this._createdAt = createdAt
    }

    createdAt() {
        let date = this._createdAt.substring(0, 10).split('-')
        return `${date[1]}/${date[2]}/${date[0]}`
    }
}

class Post extends Content {
    constructor(name, content, createdAt, comments) {
        super(name, content, createdAt);
        this.comments = comments
    }

    toCard() {
        let card = document.createElement('div')
        card.classList.add('card')

        let article = document.createElement('article')
        article.classList.add('post')

        let h2 = document.createElement('h2')
        h2.innerText = this.name

        let p = document.createElement('p')
        p.innerText = this.content

        let ul = document.createElement('ul')
        ul.classList.add('comments')

        // ADD LIKE BUTTON

        // Display Comments
        // { name: '', content: '', created_at: '' }
        this.comments.forEach(e => {
            let comment = new Comment(e.name, e.content, e.created_at)

            ul.append(comment.toListItem())
        })

        article.append(h2, p, ul)
        card.append(article)

        return card
    }
}

class Comment extends Content {
    constructor(name, content, createdAt) {
        super(name, content, createdAt);
    }

    toListItem() {
        let li = document.createElement('li')
        li.classList.add('comment')

        let h4 = document.createElement('h4')
        h4.innerText = this.name

        let p = document.createElement('p')
        p.innerText = this.content

        li.append(h4, p)
        return li
    }
}

function renderCard(post) {
    const card = post.toCard()
    document.getElementById('posts').append(card)
    console.log("Appended To Main Post List", card)
}

function renderPosts(posts) {
    posts.forEach(e => { renderCard(new Post(e.name, e.content, e.created_at, e.comments)) })
}

function fetchAllPosts() {
    return fetch(BACKEND_URL)
        .then(e => e.json())
        .then(e => renderPosts(e))
        .catch(e => handleError(e))
}

function handleError(e) {
    // RENDER ERROR MODAL
    console.log("An error has occurred! We can't seme to communicate with our backend server at the moment.", e)
}

function handleLikes() {

}

document.addEventListener("DOMContentLoaded", () => {
    fetchAllPosts().then(handleLikes())
})