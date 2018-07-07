import * as actionType from './types'
import {Api} from '../commons'
import iziToast from 'izitoast'

export const fetchUser = () => {
    return (dispatch, getState) => {

        const {authReducer: {access_token}} = getState()

        dispatch(userChangeValue("loading", true))

        new Api(access_token).fetchUsers().then(({data}) => {
            const {users} = data
            dispatch(fetchUserSuccess(users))
            dispatch(userChangeValue("loading", false))
        }).catch(error => {
            dispatch(userChangeValue("loading", false))
        });
    }
}

export const fetchUserSuccess = (users) => {

    return {
        type: actionType.FETCH_USER,
        payload: users
    }
}

export const userChangeValue = (key, value) => {
    return {
        type: actionType.USER_CHANGE_VALUE,
        payload: {
            key,
            value
        }
    }
}