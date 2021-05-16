const BACKEND_URL = 'http://localhost:3000'
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

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
    constructor(id, name, content, createdAt, comments) {
        super(id, name, content, createdAt);
        this.comments = comments
    }

    toModal() {
        console.log('Rendering Modal Content ', this)
        let modal = document.getElementById('modal')
        modal.classList.remove('hidden')

        let article = document.createElement('article')
        article.classList.add('post-modal')
        article.id = this.id

        let h1 = document.createElement('h1')
        h1.textContent = this.name

        let p = document.createElement('p')
        p.textContent = this.content

        let button = document.createElement('button')
        button.textContent = 'Close'
        button.classList.add('danger')
        button.addEventListener('click', () => {
            modal.classList.add('hidden')
            modal.childNodes.forEach(e => e.remove())
        })

        if (this.comments.length > 0) {
            let ul = document.createElement('ul')
            ul.classList.add('comments')
            this.comments.forEach(e => {
                let comment = new Comment(e.id, e.name, e.content, e.created_at)
                ul.append(comment.toListItem())
            })
            article.append(h1, p, ul, button)
        } else {
            article.append(h1, p, button)
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

        let span = document.createElement('span')
        span.textContent = EMPTY_HEART
        span.classList.add('heart')
        span.addEventListener('click', e => {
            // make sure we don't render modal content
            // so we stop the event from bubbling up to our card click event listener
            e.stopPropagation()
            // increase this posts like by one
            // if our server call is successful we can update the heart
            console.log('You clicked like on ', this)
            span.textContent = FULL_HEART
        })

        article.append(h2, p, span)
        card.append(article)

        card.addEventListener('click', () => this.toModal())

        return card
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
}

function renderPosts(posts) {
    posts.forEach(e => { renderCard(new Post(e.id, e.name, e.content, e.created_at, e.comments)) })
}

function fetchAllPosts() {
    return fetch(BACKEND_URL)
        .then(e => e.json())
        .then(e => renderPosts(e))
        .catch(e => handleError(e))
}

function handleError(e) {
    console.log("An error has occurred! We can't seme to communicate with our backend server at the moment.")
    console.log(e)
}

document.addEventListener("DOMContentLoaded", () => {
    fetchAllPosts().then(e => console.log("Loaded All 'Tweets'"))
})