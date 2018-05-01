import React, { Component } from 'react'

import {
    Route,
} from 'react-router-dom'

import 'izitoast/dist/css/iziToast.min.css'

/*
 * REDUX
 */
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import { PersistGate } from 'redux-persist/integration/react'

/*
 * CONTAINERS
 */
import {
    Home,
    AboutUs
} from './containers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    { /* ConnectedRouter will use the store from Provider automatically */ }
                    <ConnectedRouter history={history}>
                        <div>

                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={AboutUs} />

                        </div>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        )
    }
}

export default App
