import * as actionType from './types'
import {Api} from '../commons'
import iziToast from 'izitoast'

import {fetchAllCourses} from './index'
import { history } from '../store'

export const authLogin = () => {
    return (dispatch, getState) => {

        const { authReducer: {email, password} } = getState();

        dispatch(authChangeValue("loading", true))

        new Api().login(email, password).then(response => {
            const {access_token, user, rol} = response.data

            dispatch(authLoginSuccess(access_token, user, rol))
            dispatch(authChangeValue("loading", false))
            dispatch(fetchAllCourses())
        }).catch(error => {
            iziToast.error({
                title: '',
                message: 'Credenciales invalidas',
                position: 'topRight'
            })
            dispatch(authChangeValue("loading", false))
        });
    }
}

export const authLoginSuccess = (access_token, user, rol) => {

    return {
        type: actionType.AUTH_LOGIN_SUCCESS,
        payload: {
            access_token,
            user,
            rol
        }
    }
}

export const authRegister = () => {
    return (dispatch, getState) => {

        const { authReducer: {register_name, register_last_name, register_email, register_password} } = getState();

        dispatch(authChangeValue("loading", true))

        new Api().register(register_name, register_last_name, register_email, register_password).then(response => {
            dispatch(authRegisterSuccess())
            dispatch(authChangeValue("loading", false))
            iziToast.success({
                title: '',
                message: 'Usuario creado correctamente ...',
                position: 'topRight'
            })
        }).catch(error => {
            iziToast.error({
                title: '',
                message: 'No se ha podido crear el usuario',
                position: 'topRight'
            })
            dispatch(authChangeValue("loading", false))
        });
    }
}

export const authRegisterSuccess = () => {

    return {
        type: actionType.AUTH_REGISTER_SUCCESS,
    }
}

export const logOut = () => {
    return (dispatch) => {
        history.replace('/')
        dispatch(kickOut())
        dispatch(fetchAllCourses())
    }
}

export const kickOut = () => {
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

export const sendPasswordEmail = (email) => {
    return (dispatch) => {

        new Api().sendPasswordEmail(email).then(response => {
            history.replace('/')
            iziToast.success({
                title: '',
                message: 'Revisa tu email ...',
                position: 'topRight'
            })
        }).catch(error => {

        })
    }
}

export const passwordReset = (token, email, password, password_confirmation) => {
    return (dispatch) => {

        new Api().passwordReset(token, email, password, password_confirmation).then(response => {
            history.replace('/')
            iziToast.success({
                title: '',
                message: 'Contraseña cambiada',
                position: 'topRight'
            })
        }).catch(error => {

        })
    }
}