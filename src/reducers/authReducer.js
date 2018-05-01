import * as actionType from '../actions/types'

const INITIAL_STATE = {
    access_token: null,
    user: null,
    loading: false,
    modal: false,
    email: '',
    password: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionType.AUTH_LOGIN_SUCCESS:
            const {access_token, user} = action.payload
            return {
                ...state,
                access_token: access_token,
                user: user,
                modal: false,
                loading: false,
            }
        case actionType.LOG_OUT:
            return {
                ...state,
                access_token: null,
                user: null,
                loading: false,
                email: '',
                password: ''
            }
        case actionType.OPEN_MODAL:
            return {
                ...state,
                modal: action.payload
            }
        case actionType.CLOSE_MODAL:
            return {
                ...state,
                modal: null,
                loading: false
            }
        case actionType.AUTH_CHANGE_VALUE:
            const {key, value} = action.payload
            return {
                ...state,
                [key]: value
            }
        default:
            return state
    }
}
