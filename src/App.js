import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import {
    Home
} from './containers'

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                </div>
            </Router>
        );
    }
}

export default App
