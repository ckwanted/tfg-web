import * as actionType from '../actions/types'

const INITIAL_STATE = {
    access_token: null,
    user: null,
    rol: null,
    loading: false,
    modal: false,
    email: '',
    password: '',

    register_name: '',
    register_last_name: '',
    register_email: '',
    register_password: '',
    register_re_password: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionType.AUTH_LOGIN_SUCCESS:
            const {access_token, user, rol} = action.payload
            return {
                ...state,
                access_token: access_token,
                user: user,
                rol: rol,
                modal: false,
                loading: false,
            }
        case actionType.AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                modal: false,
            }
        case actionType.LOG_OUT:
            return {
                ...INITIAL_STATE
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
