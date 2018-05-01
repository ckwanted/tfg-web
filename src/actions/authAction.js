import * as actionType from './types'

export const authLogin = () => {
    return (dispatch, getState) => {

        const { authReducer: {email, password} } = getState();

        dispatch(authChangeValue("loading", true))
    }
}

export const authLoginSuccess = (payload) => {
    return {
        type: actionType.AUTH_LOGIN_SUCCESS,
        payload: payload
    }
}

export const openModal = (payload) => {
    return {
        type: actionType.OPEN_MODAL,
        payload
    }
}

export const closeModal = () => {
    return {
        type: actionType.CLOSE_MODAL
    }
}

export const authChangeValue = (key, value) => {
    return {
        type: actionType.AUTH_CHANGE_VALUE,
        payload: {
            key,
            value
        }
    }
}
