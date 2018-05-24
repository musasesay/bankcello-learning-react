import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import Menu from './components/Menu'
import data from './assets/recipes.json'

// React is exposed globally so the renderToString()
// method can work properly...
global.React = React

/* react-dom's renderToString() method: render's
* a UI to an HTML string:
*
* ==> Render HTML directly in the browser:
* ReactDOM.render(<Star />)
*
* ==> Render HTML as a string:
* var html = ReactDOM.renderToString(<Star />)
*
*/
const html = renderToString(<Menu recipes={data}/>)

const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`)
    next()
}

/* Middleware func: sentHTMLPage()
* responds to all request with an
* HTML string that wraps the server-rendered
* HTML in boilerplate necessary for creating
* a page.
*/
const sendHTMLPage = (req, res) =>
    res.status(200).send(`
<!DOCTYPE html>
<html>
    <head>
        <title>React Recipes App</title>
    </head>
    <body>
        <div id="react-container">${html}</div>
         <script>
          window.__DATA__ = ${JSON.stringify(data)}
         </script>
         <script src="bundle.js"></script>
    </body>
</html>
    `)

const app = express()
    .use(logger)
    .use(express.static('./assets'))
    .use(sendHTMLPage)

app.listen(3000, () =>
    console.log(`Recipe app running at 'http://localhost:3000'`)
)
