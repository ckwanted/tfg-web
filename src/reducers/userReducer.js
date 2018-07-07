import * as actionType from '../actions/types'

const INITIAL_STATE = {
    users: {},
    userSelected: {},
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionType.FETCH_USER:

            return {
                ...state,
                users: action.payload
            }

        case actionType.USER_CHANGE_VALUE:
            const {key, value} = action.payload
            return {
                ...state,
                [key]: value
            }
        default:
            return state
    }
}
