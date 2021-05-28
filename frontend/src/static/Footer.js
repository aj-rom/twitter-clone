import { Component } from 'react'

export default class Footer extends Component {

    render() {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col"><h4>Special Links</h4></div>
                        <div className="col"><h4>Shout Outs</h4></div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>Some links towards this applications code and my different social media accounts.</p>
                            <ul>
                                <li>
                                    <a href="https://github.com/aj-rom/twitter-clone">🖥 View This App's Code 🖥</a>
                                </li>
                                <li>
                                    <a href="https://github.com/aj-rom">⚡ GitHub Portfolio ⚡</a>
                                </li>
                                <li>
                                    <a href="https://dev.to/ajrom/twitter-clone-58l0">✍ Blog Post ✍</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col">
                            <p>This couldn't have been made without the use of the following Open-Source frameworks and
                                libraries!</p>
                            <ul>
                                <li><a href="https://rubyonrails.org/">Ruby on Rails</a></li>
                                <li><a href="https://github.com/cyu/rack-cors">Rack CORS (Rails Middleware)</a></li>
                                <li><a href="https://getbootstrap.com/">BootStrap</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}