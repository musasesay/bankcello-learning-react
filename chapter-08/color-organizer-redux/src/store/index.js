import { createStore, combineReducers, applyMiddleware } from 'redux'
import { colors, sort } from './reducers'
import stateData from '../../data/initialState'

// When we create the store we create two pieces
// of middleware: the logger and the saver.
// The data is saved to `localStorage` with middleware
// instead of the `store` method.
//
// Both the logger() and the saver() are middleware
// functions.  In Redux, middleware is defined as a
// higher-order function: it's a function that returns
// a function that returns a function.  The last function
// returned is invoked every time an action is dispatched.
//
// When... 
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

// English Translation:
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
const storeFactory = (initialState=stateData) =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({colors, sort}),
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            initialState
    )

export default storeFactory
