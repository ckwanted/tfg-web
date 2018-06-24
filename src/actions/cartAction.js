import * as actionType from './types'
import iziToast from 'izitoast'
import Api from '../commons/Api'

import {courseChangeValue} from './courseAction'

export const addToCart = (key, value) => {
    iziToast.success({
        title: '',
        message: 'Curso añadido al carrito ...',
        position: 'topRight'
    })
    return {
        type: actionType.ADD_TO_CART,
        payload: {
            key,
            value
        }
    }
}

export const removeFromTheCart = (key) => {
    return {
        type: actionType.REMOVE_FROM_THE_CART,
        payload: key
    }
}

export const clearCart = () => {
    return {
        type: actionType.CLEAR_CART,
    }
}

export const payCart = (cart) => {
    return (dispatch, getState) => {

        const { authReducer: {access_token} } = getState();
        const { cartReducer: {courses} } = getState();

        let courseIds = Object.keys(courses)

        new Api(access_token).payCart(courseIds).then(response => {
            dispatch(courseChangeValue("userPayments", response.data.userPayments));
            dispatch(clearCart());
        }).catch(error => {

        });

    }
}