import React, { Component } from 'react'
import { createdAt } from "./Shared";

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.id = props.id
        this.name = props.name
        this.content = props.content
        this.createdAt = createdAt(props.time)
    }

    render() {
        return (
            <li className="comment">
                <h4>{this.props.name} {this.createdAt}</h4>
                <p>{this.props.content}</p>
            </li>
        )
    }
}