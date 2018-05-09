import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import authReducer from './authReducer'
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

const cartReducerConfig = {
    key: 'cart',
    storage,
}

const persistedAuthReducer = persistReducer(authReducerConfig, authReducer)
const persistedCartReducer = persistReducer(cartReducerConfig, cartReducer)

export default combineReducers({
    routerReducer,
    authReducer: persistedAuthReducer,
    courseReducer,
    cartReducer: persistedCartReducer
})
