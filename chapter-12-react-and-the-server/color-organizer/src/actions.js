import fetch from 'isomorphic-fetch'

const parseResponse = response => response.json()

const logError = error => console.error(error)

/* Use isomorphic-fetch to send a request to a web
* service "then" automatically dispatch the response.
*/
const fetchThenDispatch = (dispatch, url, method, body) =>
    fetch(url, {method, body, headers: { 'Content-Type': 'application/json' }})
        .then(parseResponse)
        .then(dispatch)
        .catch(logError)

/* thunk #1... */
export const addColor = (title, color) => dispatch =>
    fetchThenDispatch(
        dispatch,
        '/api/colors',
        'POST',
        JSON.stringify({title, color})
    )

/* thunk #2... */
export const removeColor = id => dispatch =>
    fetchThenDispatch(
        dispatch,
        `/api/color/${id}`,
        'DELETE'
    )

/* thunk #3... */
export const rateColor = (id, rating) => dispatch =>
    fetchThenDispatch(
        dispatch,
        `/api/color/${id}`,
        'PUT',
        JSON.stringify({rating})
    )
