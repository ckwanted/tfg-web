import * as actionType from '../actions/types'

const INITIAL_STATE = {
    current_page: 1,
    last_page: 1,
    total: 0,
    data: [],
    loading: false,

    course: {},
    modalData: null,

    q: '',
    ckFrontEnd: false,
    ckBackEnd: false,
    ckFullStack: false,
    ckDevOps: false,
    ckAndroid: false,
    ckIos: false,

    ckBeginner: false,
    ckIntermediate: false,
    ckAdvanced: false,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionType.FETCH_ALL_COURSES:
            const {current_page, last_page, total, data} = action.payload
            return {
                ...state,
                current_page,
                last_page,
                total,
                data,
                loading: false
            }
        case actionType.FETCH_COURSE:
            return {
                ...state,
                course: action.payload,
                loading: false
            }
        case actionType.COURSE_CHANGE_VALUE:
            const {key, value} = action.payload
            return {
                ...state,
                [key]: value
            }
        default:
            return state
    }
}
