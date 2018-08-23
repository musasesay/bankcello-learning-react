import { createStore, combineReducers, applyMiddleware } from 'redux'
import { colors, sort } from './reducers'
import stateData from '../../data/initialState'

// (1) When we create the store we create two pieces
// of middleware: the logger and the saver.
// The data is saved to `localStorage` with middleware
// instead of the `store` method.
//
// (2) Both the logger() and the saver() are middleware
// functions.  In Redux, middleware is defined as a
// higher-order function: it's a function that returns
// a function that returns a function.  The last function
// returned is invoked every time an action is dispatched.
//
// (3) When this function is invoked, you have
// access to the action, the store, and the function for
// sending the action to the next middleware.
//
// (4) In the logger, before the action is dispatched, we
// open a new console group and log the current state
// and the current action.  Invoking `next` pipes
// the action on to the next piece of middleware and eventually
// the reducers.  The state at this point has been updated,
// so we can log the changed state and end the console group.
//
const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

//
// In English:
//
// (It's a function that returns a function that returns a function...)
//
// var logger = function logger(store) {
//     return function (next) {
//         return function (action) {
//             var result = void 0;
//             console.groupCollapsed("dispatching", action.type);
//             console.log('prev state', store.getState());
//             console.log('action', action);
//             result = next(action);
//             console.log('next state', store.getState());
//             console.groupEnd();
//             return result;
//         };
//     };
// };

// In the saver, we invoke `next` with the action, which
// will cause the state to change.  Then we save the
// new state in `localStorage` and return the result...
const saver = store => next => action => {
    let result = next(action)
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return result
}

// Create a storeFactory()...a factory that manages the 
// process of creating stores.  In this case, the factory
// will create a store that has middleware for logging
// and saving data.  The storeFactory() will be one file that 
// contains one function that groups everything needed to
// create the store.  Whenever we need a store, we can invoke
// this function:
//
//   const store = storeFactory(initialData)
//
// Instead of exporting the store directly, we export
// a function, a factory that can be used to create
// stores.  If this factory is invoked, then it will
// create and return a store that incorporates logging
// and saving.
//
// CHEF DANNON of CHEF'S INSTITUTE OF AMERICA: Don't work
// in a hotel, me boy...it's a factory...
//
// @reference: https://redux.js.org/api-reference/applymiddleware
const storeFactory = (initialState=stateData) =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({colors, sort}),
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            initialState
    )

export default storeFactory
