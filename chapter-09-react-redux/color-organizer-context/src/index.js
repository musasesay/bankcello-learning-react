import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import storeFactory from './store'

const store = storeFactory()

window.React = React
window.store = store

render(
    <App store={store} />,
    document.getElementById('react-container')
)

/** Because the `App` component itself triggers the
* UI update, there is no longer a need to subscribe
* to the store from the entry ./index.js file; we are
* listening to store changes from the same component
* that adds the store to the context, `App` 
*/
// const render = () =>
//     ReactDOM.render(
//         <App store={store}/>,
//         document.getElementById('react-container')
//     )
// 
// store.subscribe(render)
// render()
