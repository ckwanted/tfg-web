import * as actionType from '../actions/types'

const INITIAL_STATE = {
    access_token: null,
    user: null,
    loading: false,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionType.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
            }
            break

        case actionType.LOG_OUT:
            return {
                ...state,
                access_token: null,
                user: null,
            }
        default:
            return state
    }
}
