import Comment from './Comment.js'
import {createdAt} from "./Shared.js";
import {likePost, unlikePost} from "./Crud";
import React, {Component} from "react";
import ReactDOM from 'react-dom'
import ContentForm from "./ContentForm";
import Modal from "./Modal";

// Like Emoticons
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.id = props.id
        this.name = props.name
        this.content = props.content
        this.createdAt = createdAt(props.time)
        this.comments = props.comments
        this.likes = props.likes
        this.state = {
            likes: props.likes,
            comments: props.comments,
        }
    }

    getComments = () => {
        if (this.comments === undefined) return ""

        console.log('CURRENT COMMENTS STATE', this.state.comments)
        return this.state.comments
            .map(e => <Comment key={e.id} id={e.id} name={e.name} content={e.content} time={e.created_at}/>)
    }

    updateComment(name, content) {
        console.log('Adding', name, content)
        console.log('Previous comments', this.state.comments)
        const newComments = [...this.state.comments, {name: name, content: content, id: -1, created_at: 'Just Now'}]
        this.setState({
            ...this.state,
            comments: newComments
        }, this.renderM)


    }

    renderM = () => {
        console.log('Rendering Modal', this.state)
        const article = (
            <article className="post-modal" id={this.id}>
                <header>
                    <h1>{this.name} {this.createdAt}</h1>
                    <p>{this.content}</p>
                    <div>{this.state.likes} Likes</div>
                </header>
                <ul className="comments">
                    {this.getComments()}
                </ul>
                <ContentForm post={this} id={this.id} title="Leave A Comment" className="comment-form"/>
            </article>
        )

        ReactDOM.render(<Modal content={article}/>, document.getElementById('main'))
    }

    renderModal = event => {
        event.stopPropagation()
        this.renderM()
    }


    render() {
        return (
            <div id={this.id} className="card" onClick={this.renderModal}>
                <article className="post">
                    <h2>{this.name} {this.createdAt}</h2>
                    <p>{this.content}</p>
                    {this.likeButton()}
                </article>
            </div>
        )
    }

    handleLike = e => {
        e.stopPropagation()
        likePost(this.id)
            .then(e => this.setState({ likes: this.state.likes + 1}))
    }

    handleUnlike = e => {
        e.stopPropagation()
        unlikePost(this.id)
            .then(e => this.setState({ likes: this.state.likes - 1 }))
    }

    likeButton() {
        if (this.state.likes !== this.props.likes) {
            return <span className="heart" onClick={this.handleUnlike}>{FULL_HEART} {this.state.likes}</span>
        } else {
            return <span className="heart" onClick={this.handleLike}>{EMPTY_HEART} {this.likes}</span>
        }

    }
}