import C from '../constants'

/** The color reducer is a function that creates a new
* object or rates an existing one.
*
* You'll notice that the RATE_COLOR action passes an ID
* that's not used by the color reducer.
*
* That's because the ID of this action is used to locate
* the color in an entirely different reducer.  One action
* object can impact several reducers.
*/
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
            // operator in lieue of...
            //    Object.assign({rating:action.rating}, state)
            // ...to assign the value of the current state
            // to a new object.
			//
			// Checks that the id's match before replacing.
			// If the ID's don't match, simply return the
            // inputted state unchanged.
            // Thus this can be used in a shotgun approach
			// via map() in colors reducer... 
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

/* The color reducer is designed to manage leaves on 
* the colors branch in our state tree.
*
* The colors reducer will be used to manage the entire
* colors branch.
*
* The colors reducer is concerned with the array
* of colors.  It uses the color reducer to focus
* on the individual color objects.
*/
export const colors = (state = [], action) => {
    switch (action.type) {
        case C.ADD_COLOR :
			//   Creates a new array by concatenating all of the
			// values of the existing state array with a 
			// new color object.
			//
			//   The new color is created
			// by passing a blank state object and the action
			// to the color reducer.
            return [
                ...state,
                color({}, action)
            ]
        case C.RATE_COLOR :
			//   Returns a new array of colors with the desired
			// color rated.
			//   The colors reducer locates the
			// color to be rated within the current state
			// array.
			//   It then uses the color reducer to obtain
			// the newly rated color object and replaces it in
			// the array.
			//   Actually, it calls map() on every item
			// in the state array, and lets the color reducer
			// figure out if the ids match, and if so,
			// it replaces with an updated color object.
            //   "Rate 'em all!
            //   Let color::RATE_COLOR sort 'em out!"
            return state.map(
                c => color(c, action)
            )
        case C.REMOVE_COLOR :
			// Creates a new array by filtering out the
			// desired color to remove.
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
