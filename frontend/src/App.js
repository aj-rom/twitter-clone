import { Component } from 'react'
import Footer from "./static/Footer";
import Header from "./static/Header";
import Main from "./static/Main";

export default class App extends Component {

    render() {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
}