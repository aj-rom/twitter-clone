import { Component } from 'react'
import ContentForm from "../ContentForm";
import ReactDOM from "react-dom";
import Modal from "../Modal";

export default class Header extends Component {

    renderNewTweetForm = () => {
        let modal = document.getElementById('modal')
        modal.classList.remove('hidden')

        const form = <ContentForm title="Post A Tweet" className="new-tweet-form"/>
        ReactDOM.render(<Modal content={form}/>, document.getElementById('main'))
    }

    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li className="logo">🌎 Twitter Clone</li>
                        <li>
                            <button onClick={this.renderNewTweetForm}>Post a Tweet</button>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}