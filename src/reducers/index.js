import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import authReducer from './authReducer'
import userReducer from './userReducer'
import courseReducer from './courseReducer'
import cartReducer from './cartReducer'

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

const persistedAuthReducer = persistReducer(authReducerConfig, authReducer)

const rootReducer =  combineReducers({
    routerReducer,
    authReducer: persistedAuthReducer,
    userReducer,
    courseReducer,
    cartReducer
})

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['routerReducer', 'authReducer', 'courseReducer']
}

export default persistReducer(rootPersistConfig, rootReducer)
