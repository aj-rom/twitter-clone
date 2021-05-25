import getFormJSON from "./form.js";
import { getCloseModalButton } from "./shared.js";
import { fetchAllPosts } from "./crud.js";

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

// DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
    fetchAllPosts().then(e => console.log("Fetched", e))
    console.log("Fetching posts...")
})