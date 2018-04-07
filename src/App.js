import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

/*
 * REDUX
 */
import store from './store'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

/*
 * CONTAINERS
 */
import {
    Home
} from './containers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

class App extends Component {

    render() {

        return (
            <Provider store={store}>
                { /* ConnectedRouter will use the store from Provider automatically */ }
                <ConnectedRouter history={history}>
                    <div>

                        <Route exact path="/" component={Home} />

                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default App
