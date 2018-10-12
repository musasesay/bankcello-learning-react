import { connect } from 'react-redux'
import { compose } from 'redux'
import ColorList from './ui/ColorList'
import ColorDetails from './ui/ColorDetails'
import AddColorForm from './ui/AddColorForm'
import { addColor, rateColor, removeColor } from '../actions'
import { findById } from '../lib/array-helpers'
import { sortColors } from '../lib/array-helpers'

export const NewColor = connect(
    null, /* mapStateToProps() */
    dispatch => /* mapDispatchToProps() */
        ({
            onNewColor(title, color) {
                dispatch(addColor(title, color))
            }
        })
)(AddColorForm)

export const Colors = connect(
    ({colors}, {match}) => /* mapStateToProps() */
        ({
            colors: sortColors(colors, match.params.sort)
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

export const Color = connect(
    // ({ colors }, { match }) => /* mapStateToProps() */
    //    findById(colors, match.params.id)

    // Or, if you prefer English...
    ( state , props ) => {
        var sWho = "Color::mapStateToProps";
        console.log( `${sWho}(): state = `, state );
        console.log( `${sWho}(): state.colors = `, state.colors );
        console.log( `${sWho}(): props = `, props );
        console.log( `${sWho}(): props.match.params = `, props.match.params );
        var returno = findById(state.colors, props.match.params.id)
        console.log( `${sWho}(): Returning `, returno )
        return returno
    }
)(ColorDetails)
