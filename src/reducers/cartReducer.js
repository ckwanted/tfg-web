import * as actionType from '../actions/types'

const INITIAL_STATE = {
    courses: {}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionType.ADD_TO_CART:
            const {key, value} = action.payload
            let newCourses = {...state}
            newCourses.courses[key] = value

            return {
                ...newCourses
            }
        case actionType.REMOVE_FROM_THE_CART:
            let newState = {...state}

            delete newState.courses[action.payload]

            return {
                ...newState,
            }
        case actionType.CLEAR_CART:
            return {
                courses: {}
            }
        default:
            return state
    }
}
