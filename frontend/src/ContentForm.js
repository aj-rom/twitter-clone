import { Component } from 'react'
import {addCommentToPost, submitTweet} from "./Crud";

export default class ContentForm extends Component {
    constructor(props) {
        super(props);
        this.title = props.title
        this.id = props.id
        this.post = props.post
        this.className = props.className

        const date = new Date();
        const ops = { minimumIntegerDigits: 2, useGrouping: false }
        this.createdAt = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toLocaleString('en-US', ops)}-${date.getDate()
            .toLocaleString('en-US', ops)}`

        this.state = {value: '', content: ''};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange = event => {
        this.setState({ name: event.target.value });
    }

    handleContentChange = event => {
        this.setState({ content: event.target.value })
    }

    handleSubmit = event => {
        if (this.className === 'comment-form') {
            const comment = { name: this.state.name, content: this.state.content, post_id: this.id }
            addCommentToPost(comment)
                .then(e => alert('Successfully submitted comment'))
                .then(e => this.props.post.updateComment(this.state.name, this.state.content))
        } else {
            const tweet = { name: this.state.name, content: this.state.content }
            submitTweet(tweet)
                .then(e => alert('Successfully submitted new tweet.'))
                .then(e => location.reload())
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className='form-container'>
                <form className={this.className} onSubmit={this.handleSubmit}>
                    <h2>{this.title}</h2>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        Content:
                        <input type="textarea" value={this.state.content} onChange={this.handleContentChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )

    }
}