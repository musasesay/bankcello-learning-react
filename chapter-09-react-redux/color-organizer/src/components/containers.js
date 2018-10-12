import { connect } from 'react-redux'
import AddColorForm from './ui/AddColorForm'
import SortMenu from './ui/SortMenu'
import ColorList from './ui/ColorList'
import { addColor, sortColors, rateColor, removeColor } from '../actions'
import { sortFunction } from '../lib/array-helpers'

export const NewColor = connect(
    null, /* mapStateToProps() */
    dispatch => /* mapDispatchToProps() */
        ({
            onNewColor(title, color) {
                dispatch(addColor(title,color))
            }
        })
)(AddColorForm)

export const Menu = connect(
    state => /* mapStateToProps() */
        ({
            sort: state.sort
        }),
    dispatch => /* mapDispatchToProps() */
        ({
            onSelect(sortBy) {
                dispatch(sortColors(sortBy))
            }
        })
)(SortMenu)

/** <+> If we keep our UI components purely presentational,
 * we can rely on React Redux to create the container components.
 * <+> React Redux helps us create container components through mapping
 * the current state of the Redux store to the properties of
 * a presentational component.
 * <+> It also maps the store's `dispatch` function to callback
 * properties.
 * <+> this is all accomplished through a higher-order function
 * called `connect()`:
 * <+> `connect()` is a higher-order function
 * that returns a function that returns a component. 
 * <+> `connect()` expects two arguments:
 *   (1) mapStateToProps()
 *   and
 *   (2) mapDispatchToProps()
 *
 * Both are functions.  It returns a function that expects
 * a presentational component, and wraps it
 * with a container that sends it data via props.
 *
 * (1) The first function, mapStateToProps(), injects
 *     state as an argument and returns an object that will
 *     be mapped to props.  We set the `colors` property of
 *     the ColorList component to an array of sorted colors
 *     from state.
 *
 * (2) The second function, mapDispatchToProps(), injects
 *     the store's `dispatch()` function as an argument
 *     that can be used when the ColorList component
 *     invokes callback function properties.  When
 *     `ColorList` raises `onRate` or `onRemove`
 *     events, data about the color to rate or remove
 *     is obtained and dispatched.
*/
export const Colors = connect(
    state => /* mapStateToProps() */
        ({
            colors: [...state.colors].sort(sortFunction(state.sort))
        }),
    dispatch => /* mapDispatchToProps() */
        ({
            onRemove(id) {
                dispatch(removeColor(id))
            },
            onRate(id, rating) {
                dispatch(rateColor(id, rating))
            }
        })
)(ColorList)
