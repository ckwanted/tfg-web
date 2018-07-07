import * as actionType from './types'
import {Api} from '../commons'
import iziToast from 'izitoast'

export const fetchUser = () => {
    return (dispatch, getState) => {

        const {
            authReducer: {access_token},
            userReducer: {q, users}
        } = getState()

        const {current_page, last_page} = users

        dispatch(userChangeValue("loading", true))

        new Api(access_token).fetchUsers(q).then(({data}) => {
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

export const userUpdate = () => {
    return (dispatch, getState) => {

        const {
            authReducer: {access_token},
            userReducer: {userSelected}
        } = getState()

        /*new Api(access_token).updateUser(userSelected).then(({data}) => {

        }).catch(error => {

        })*/

    }
}

export const userNextPage = () => {
    return (dispatch, getState) => {

        const {
            authReducer: {access_token},
            userReducer: {q, users}
        } = getState()

        const {current_page, last_page} = users

        dispatch(userChangeValue("loadingNextPage", true))

        new Api(access_token).fetchUsers(q, current_page + 1).then(({data}) => {
            const {users} = data
            dispatch(userNextPageSuccess(users))
            dispatch(userChangeValue("loadingNextPage", false))
        }).catch(error => {
            dispatch(userChangeValue("loadingNextPage", false))
        });

    }
}

export const userNextPageSuccess = (users) => {

    return {
        type: actionType.USER_NEXT_PAGE,
        payload: users
    }
}

export const userChangeValue = (key, value, jsonKey = null) => {
    return {
        type: actionType.USER_CHANGE_VALUE,
        payload: {
            key,
            value,
            jsonKey
        }
    }
}