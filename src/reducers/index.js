import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import authReducer from './authReducer'

/*
 * REDUX PERSIST
 */
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

const authReducerConfig = {
    key: 'auth',
    storage,
    blacklist: ['password']
}

export default combineReducers({
    routerReducer,
    authReducer: persistReducer(authReducerConfig, authReducer),
})
