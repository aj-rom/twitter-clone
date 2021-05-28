import { Component } from "react";

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.content = props.content
    }

    closeModal = (e) => {
        e.stopPropagation()
        const modal = document.getElementById('modal')
        modal.childNodes.forEach(e => e.remove())
        modal.classList.add('hidden')
    }

    render() {
        return (
            <div id="modal" className="modal container-fluid">
                <button onClick={this.closeModal} className="danger">Close</button>
                {this.content}
            </div>
        )
    }
}