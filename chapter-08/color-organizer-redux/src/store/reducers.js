import C from '../constants'

export const color = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_COLOR:
            // Returns a new color object constructed
            // from the action's payload data.
            return {
                id: action.id,
                title: action.title,
                color: action.color,
                timestamp: action.timestamp,
                rating: 0
            }
        case C.RATE_COLOR:
            // Returns a new color object with
            // the desired rating. Use the ES7 object spread
            // operator -- in lieue of...
            //  Object.assign({rating:action.rating}, state)
            // -- to assign the value of the current state
            // to a new object.
            return (state.id !== action.id) ?
                state :
                {
                    ...state,
                    rating: action.rating
                }
        default :
            // Reducers should always return something.
            // If, for some reason this reducer is invoked
            // with an unrecognized action, we will return
            // the current state: the default case.
            return state
    }
}

export const colors = (state = [], action) => {
    switch (action.type) {
        case C.ADD_COLOR :
            return [
                ...state,
                color({}, action)
            ]
        case C.RATE_COLOR :
            return state.map(
                c => color(c, action)
            )
        case C.REMOVE_COLOR :
            return state.filter(
                c => c.id !== action.id
            )
        default:
            return state
    }
}

export const sort = (state = "SORTED_BY_DATE", action) => {
    switch (action.type) {
        case C.SORT_COLORS:
            return action.sortBy
        default :
            return state
    }
}
