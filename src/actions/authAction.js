import * as actionType from './types'

export const openModal = (payload) => {
    console.log("MARIO", payload)
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
