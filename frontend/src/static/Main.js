import { Component } from 'react'

export default class Main extends Component {

    render() {
        return (
            <main id="main" className="container">
                <div id="modal" className="modal container-fluid hidden"/>
                <h1>Most Recent Tweets</h1>
                <div className="container-fluid">
                    <ul id="posts"/>
                </div>
            </main>
        )
    }
}