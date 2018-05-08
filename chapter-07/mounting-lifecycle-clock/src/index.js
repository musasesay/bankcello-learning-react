import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Clock from './clock'
const target = document.getElementById('react-container')

window.React = React

// Use react-dom's unmountComponentAtNode() to manually
// un-mount the component (and thus encourage the cleanup
// of resources)...
render(
    <Clock onClose={() => unmountComponentAtNode(target) }/>,
    target
)
