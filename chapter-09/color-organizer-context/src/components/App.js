import '../../stylesheets/APP.scss'
import { Component } from 'react'
import PropTypes from 'prop-types'
import SortMenu from './SortMenu'
import ColorList from './ColorList'
import AddColorForm from './AddColorForm'
import { sortFunction } from '../lib/array-helpers'

/** Pass the store using context:
* <*> Take advantage of a React feature called
* `context` that allows us to pass variables
* to components wihout having to explicitly
* pass them down through the tree as properties.
*
* <*> Any child component can access these context variables.
*/
class App extends Component {

	/* (1) First, adding context to a component requires that
	* you use the `getChildContext()` lifecycle function.
	* It will return the object that defines the context.
	* In this case we add the store to the context, which
	* we can access through props (passed when
	* the app was instantiated: index.js: <App store={store} />,)
	* ...
	*/
    getChildContext() {
        return {
            store: this.props.store
        }
    }

	/* (4) The final step is to subscribe to the the store
    *  and update the component tree every time the store updates
	*  state.  This can be achieved with the mounting lifecycle functions. 
	*
	*  (5A) In `componentWillMount()`, we can subscribe to the store
	*  and use `this.forceUpdate()` to trigger the updating 
	*  lifecycle, which will re-render our UI.
	*
	* (6) Because the `App` component itself triggers the
	* UI update, there is no longer a need to subscribe
	* to the store from the entry ./index.js file via...
	*    store.subscribe(render)
	* We are listening to store changes from the same component
	* that adds the store to the context, `App`. 
	*/
    componentWillMount() {
        this.unsubscribe = store.subscribe(
            () => this.forceUpdate()
        )
    }

	/*
	*  (5b) In `componentWillUnmount()`, we can invoke the `unsubscribe`
	*  function and stop listening to the store.
	*/
    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
		const sWho = "App::render";
		console.log(`${sWho}(): store.getState() = `, store.getState() )
        const { colors, sort } = store.getState()
        const sortedColors = [...colors].sort(sortFunction(sort))
        return (
            <div className="app">
                <SortMenu />
                <AddColorForm />
                <ColorList colors={sortedColors} />
            </div>
        )
    }

}

App.propTypes = {
    store: PropTypes.object.isRequired
}

/* (2) Next, you will need to specify `childContextTypes`
* on the component instance and define your context object.
* This is similar to adding `propTypes` or `defaultProps`
* to a component instance.  However, for context to work, 
* you must take this step.
*
*  (3) At this point, any children of the `App` component
*  will have access to the store via the context.  They can
*  invoke `store.getState()` and `store.dispatch()` directly.
*/
App.childContextTypes = {
    store: PropTypes.object.isRequired
}

export default App
