import {createStore, applyMiddleware, compose} from 'redux'
import ReduxThunk from 'redux-thunk'
import allReducers from '../reducers'
import createHistory from 'history/createBrowserHistory'

import {persistStore} from 'redux-persist'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

let middlewares = [ReduxThunk]

if(process.env.REACT_APP_LOGGER === 'true') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
}


const store = compose(applyMiddleware(...middlewares))(createStore)(allReducers)
const persistor = persistStore(store)

export {
    store,
    persistor,
    history
}