import React from 'react'
// As of React 16,
// ReactDom::render() is deprecated...
// ...use the more performant
// ReactDom::hydrate()
// instead...
//import { render } from 'react-dom'
import { hydrate } from 'react-dom'
import Menu from './components/Menu'

window.React = React

alert('bundle loaded, hydrating browser')

hydrate(
    <Menu recipes={__DATA__} />,
    document.getElementById("react-container")
)

alert('render complete')
