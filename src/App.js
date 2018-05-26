import React, { Component } from 'react'

import {
    Route,
} from 'react-router-dom'

import 'izitoast/dist/css/iziToast.min.css'

/*
 * SET UP FONTAWESOME 5
 */
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faCheckSquare from '@fortawesome/fontawesome-free-solid/faCheckSquare'
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'

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
    Course,
    CourseDetail,
    AboutUs,
    Cart
} from './containers'

/*
 * Material UI
 */
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: { main: '#002e67' },
        secondary: { main: '#42648e' },
    },
    overrides: {
        MuiButton: {
            root: {
                background: 'linear-gradient(45deg, #002e67 30%, #42648e 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 40,
                padding: '10px 20px',
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
            },
        },
    },
})
//---------------------------------------------------------------------------------

fontawesome.library.add(brands, faCheckSquare, faCoffee)

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    { /* ConnectedRouter will use the store from Provider automatically */ }
                    <ConnectedRouter history={history}>
                        <MuiThemeProvider theme={theme}>
                            <div>

                                <Route exact path="/" component={Home} />

                                <Route exact path="/courses" component={Course} />
                                <Route path="/courses/:slug" component={CourseDetail} />

                                <Route path="/cart" component={Cart} />

                                <Route path="/about" component={AboutUs} />

                            </div>
                        </MuiThemeProvider>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        )
    }
}

export default App
