import '../../stylesheets/AddColorForm.scss'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { addColor } from '../actions'

/** Let's refactor the `AddColorForm` component to retrieve the store
* and dispatch the `ADD_COLOR` action directly.
*
* (1) The context object is passed to stateless functional
* components as the second argument, after props.
* We can use object destructuring to obtain the store
* from this object directly in the arguments.
* (In English: const AddColorForm = (props, context)=>{
*   let store = context.store;
* }
*/
const AddColorForm = (props, { store }) => {

    let _title, _color

    const submit = e => {
        e.preventDefault()
        store.dispatch(addColor(_title.value, _color.value))
        _title.value = ''
        _color.value = '#000000'
        _title.focus()
    }

	// About Refs: In this stateless functional component,
	// `refs` are set with a callback function instead of a string.
	// The callback function passes the element's instance as
	// an argument.  This instance can be captured and
	// saved into a local variable like _title or _color.
	// Once we've saved the refs to local variables, they
	// are easily accessed when the form is submitted.
    return (
        <form className="add-color" onSubmit={submit}>
            <input ref={le_input => { console.log(`SHEMP: Settin' _title = le_input=`, le_input, `, Moe...`); _title = le_input } }
                   type="text"
                   placeholder="color title..." required/>
            <input ref={le_input => { console.log(`SHEMP: Setting' _color = le_input=`, le_input, `, Moe...`); _color = le_input} }
                   type="color" required/>
            <button>ADD</button>
        </form>
    )

}

/* (2) In order to use the store, we must define `contextTypes`
* on the AddColorForm instance.  This is where we tell React
* which context variables this component will use.  This is a
* required step. Without it, the store cannot be retrieved 
* from the context.
*/
AddColorForm.contextTypes = {
    store: PropTypes.object
}

export default AddColorForm
