import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
/* To use the router isomorphically, use BrowserRouter
* rather than HashRouter, which adds a # before each route...
*/
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import storeFactory from './store'

const store = storeFactory(false, window.__INITIAL_STATE__)

window.React = React
window.store = store

console.log('rendered from here...')

hydrate(
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-container')
)
