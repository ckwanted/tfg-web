import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import authReducer from './authReducer'
import courseReducer from './courseReducer'

/*
 * REDUX PERSIST
 */
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

const authReducerConfig = {
    key: 'auth',
    storage,
    blacklist: ['email', 'password', 'register_name', 'register_last_name', 'register_email', 'register_password', 'register_re_password']
}

export default combineReducers({
    routerReducer,
    authReducer: persistReducer(authReducerConfig, authReducer),
    courseReducer,
})
