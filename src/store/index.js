import {createStore, applyMiddleware, compose} from 'redux'
import ReduxThunk from 'redux-thunk'
import allReducers from '../reducers'

let middlewares = [ReduxThunk]

if(process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
}

const store = compose(applyMiddleware(...middlewares))(createStore)(allReducers)

export default store