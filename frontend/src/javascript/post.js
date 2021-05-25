import Content from './content.js'
import Comment from './comment.js'
import getFormJSON from "./form.js";
import { getCloseModalButton } from "./shared.js";
import { addCommentToPost, likePost} from "./crud";

// Like Emoticons
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Temp Array to Cache our JSON objects of tweets (posts)
const POSTS = []

export default class Post extends Content {
    constructor(id, name, content, createdAt, comments, likes) {
        super(id, name, content, createdAt);
        this.comments = comments
        this.likes = likes
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