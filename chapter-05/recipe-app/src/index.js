/* Wherever webpack finds an import statement, 
* it will find the associated module in the filesystem
* and include it in the bundle.
*/
import React from 'react'
import { render } from 'react-dom'
import Menu from './components/Menu'
import data from '../data/recipes'

/* Expose the React library globally in the browser... */
window.React = React

render(
    <Menu recipes={data} />,
    document.getElementById("react-container")
)
