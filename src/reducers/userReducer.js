import * as actionType from '../actions/types'

const INITIAL_STATE = {
    users: {},
    userSelected: {},
    loading: false,
    loadingNextPage: false,
    q: '',
    modal: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case actionType.FETCH_USER:

            return {
                ...state,
                users: action.payload
            }

        case actionType.USER_NEXT_PAGE:

            let usersCopy = {...state.users}
            usersCopy.current_page = action.payload.current_page
            usersCopy.data = usersCopy.data.concat(action.payload.data)
            usersCopy.first_page_url = action.payload.first_page_url
            usersCopy.from = action.payload.from
            usersCopy.last_page = action.payload.last_page
            usersCopy.last_page_url = action.payload.last_page_url
            usersCopy.path = action.payload.path
            usersCopy.per_page = action.payload.per_page
            usersCopy.prev_page_url = action.payload.prev_page_url
            usersCopy.to = action.payload.to
            usersCopy.total = action.payload.total

            return {
                ...state,
                users: usersCopy,
            }

        case actionType.USER_UPDATE:

            let usersUpdate = {...state.users}
            let data = usersUpdate.data

            for(let i = 0; i < data.length; i++) {
                if(data[i].id === action.payload.id) {
                    data[i] = action.payload
                    break
                }
            }

            return {
                ...state,
                users: usersUpdate,
                modal: false,
            }

        case actionType.USER_CHANGE_VALUE:
            const {key, value, jsonKey} = action.payload

            if(jsonKey) {
                let json = state[jsonKey]
                return {
                    ...state,
                    [jsonKey]: {
                        ...json,
                        [key]: value
                    }
                }
            }

            return {
                ...state,
                [key]: value
            }

        case actionType.USER_DELETE:

            return {
                ...state,
                modal: false,
            }

        default:
            return state
    }
}
