import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

import authReducer from './authReducer'

export default combineReducers({
    routerReducer,
    formReducer,
    authReducer,
})
