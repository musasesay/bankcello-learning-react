import { createStore, combineReducers, applyMiddleware } from 'redux'
import { colors, sort } from './reducers'
import stateData from '../../data/initialState'

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

const storeFactory = (initialState=stateData) =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({colors, sort}),
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            initialState
    )

export default storeFactory
