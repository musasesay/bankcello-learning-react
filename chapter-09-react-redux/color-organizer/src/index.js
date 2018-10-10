import React from 'react'
import { render } from 'react-dom'
/** 
* <*> `react-redux` supplies us with a component that we can use
* to set up our store in the context, the `provider`.
*
* <*> We can wrap any React element with the provider and that
* element's children will have access to the store via context.
*/
import { Provider } from 'react-redux'
import App from './components/App'
import storeFactory from './store'

const store = storeFactory()

window.React = React
window.store = store

/**
* <*> The Provider adds the store to the context
* and updates the App component when actions have been
* dispatched.  The provider expects a single child
* component...in this case, App...
*
* App: I'm an only child!
*
* <*> The provider requires that we pass the store
*     as a property.  It adds the store to the context
*     so that it can be retrieved by any child of the 
*     App component.  Simply using the provider can
*     save us some time and simplify our code.
*/
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-container')
)
