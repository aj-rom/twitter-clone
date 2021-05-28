import { fetchAllPosts } from "./Crud.js";
import './style/style.css'
import ReactDOM from 'react-dom'
import App from "./App";

// DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
    fetchAllPosts().then(e => console.log("Done"))
    console.log("Fetching posts...")
})

ReactDOM.render(<App />, document.getElementById('root'))