import C from '../constants'

export const color = (state = {}, action={ type: null }) => {
    switch (action.type) {
        case C.ADD_COLOR:
            return {
                id: action.id,
                title: action.title,
                color: action.color,
                timestamp: action.timestamp,
                rating: 0
            }
        case C.RATE_COLOR:
            state.rating = action.rating
            return state     
        default :
            return state
    }
}
