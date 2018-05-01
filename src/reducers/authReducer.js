import * as actionType from '../actions/types'

const INITIAL_STATE = {
    access_token: null,
    user: null,
    loading: false,
    modal: false,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionType.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
            }
        case actionType.LOG_OUT:
            return {
                ...state,
                access_token: null,
                user: null,
            }
        case actionType.OPEN_MODAL:
            return {
                ...state,
                modal: action.payload
            }
        case actionType.CLOSE_MODAL:
            return {
                ...state,
                modal: null
            }
        default:
            return state
    }
}
