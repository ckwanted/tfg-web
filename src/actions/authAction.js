import * as actionType from './types'
import {Api} from '../commons'
import iziToast from 'izitoast'

export const authLogin = () => {
    return (dispatch, getState) => {

        const { authReducer: {email, password} } = getState();

        dispatch(authChangeValue("loading", true))

        new Api().login(email, password).then(response => {
            const {access_token, user} = response.data

            dispatch(authLoginSuccess(access_token, user))
            dispatch(authChangeValue("loading", false))
        }).catch(error => {
            iziToast.error({
                title: '',
                message: 'Credenciales invalidas',
                position: 'topRight'
            });
            dispatch(authChangeValue("loading", false))
        });
    }
}

export const authLoginSuccess = (access_token, user) => {

    return {
        type: actionType.AUTH_LOGIN_SUCCESS,
        payload: {
            access_token,
            user
        }
    }
}

export const logOut = () => {
    return {
        type: actionType.LOG_OUT
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
