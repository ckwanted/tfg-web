import * as actionType from './types'
import iziToast from 'izitoast'

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
