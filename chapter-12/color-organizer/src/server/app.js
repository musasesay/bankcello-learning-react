import express from 'express'
import path from 'path'
/* Use Express bodyParser middleware to parse incoming
* requests and obtain any variables sent to the routes.
*/
import bodyParser from 'body-parser'
import fs from 'fs'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
/* Our color api...as middleware... */
import api from './color-api'
import App from '../components/App'
import storeFactory from '../store'
import initialState from '../../data/initialState.json'

/* staticCSS: middleware to handle (and "compile") SCSS gracefully... */
const staticCSS = fs.readFileSync(path.join(__dirname, '../../dist/assets/bundle.css'))

/* fileAssets: middleware to handle static assets... */
const fileAssets = express.static(path.join(__dirname, '../../dist/assets'))

const serverStore = storeFactory(true, initialState)

/* Save the state to a new JSON file every time the state changes... 
* The `serverStore` is now the main source of truth.
*/ 
serverStore.subscribe(() =>
    fs.writeFile(
        path.join(__dirname, '../../data/initialState.json'),
        JSON.stringify(serverStore.getState()),
        error => (error) ? console.log("Error saving state!", error) : null
    )
)

const buildHTMLPage = ({html, state, css}) => `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        <meta charset="utf-8">
        <title>Universal Color Organizer</title>
        <style>${staticCSS}</style>
    </head>
    <body>
        <div id="react-container">${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/bundle.js"></script>
    </body>
</html>
`

const renderComponentsToHTML = ({url, store}) =>
    ({
        state: store.getState(),
        html: renderToString(
            <Provider store={store}>
                <StaticRouter location={url} context={{}}>
                    <App />
                </StaticRouter>
            </Provider>
        )
    })

/* Higher Order Function:
*  (1) Initially invoked with the serverStore once.
*      (Sealing serverStore into the function scope
*       as `store`...)
*  (2) Returns a function that is invoked on every request
*      and will always have access to the serverStore.
*
*  When `htmlResponse()` is invoked, it expects a single 
*  argument: the `url` that has been requested by the user.
*  For step one, we will create a higher order function that
*  packages `url` with a new client `store` created using
*  the current state of the `serverStore`(i.e., a clone
*  of 'serverStore').  Both `store` and `url` are passed
*  to the next function, step 2, in a single object:
*/
const makeClientStoreFrom = store => url =>
    ({
        url,
        store: storeFactory(false, store.getState())
    })

/* In order to generate an HTML response, there are three
* steps:
*  1. Create a store that runs on the client using the
*  data from the serverStore
*  2. Render the component tree as HTML using the StaticRouter.
*  3. Create the HTML page that will be sent to the client.
*/
const htmlResponse = compose(
    buildHTMLPage,
    renderComponentsToHTML,
    makeClientStoreFrom(serverStore)
)

const respond = ({url}, res) =>
    res.status(200).send(
      htmlResponse(url)
    )

const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`)
    next()
}

/* Middleware func: addStoreToRequestPipeline():
* Adds the serverStore to the request pipeline
* so that it can be used by other middleware
* during a request...
*/
const addStoreToRequestPipeline = (req, res, next) => {
    req.store = serverStore
    next()
}

export default express()
    .use(bodyParser.json())
    .use(logger)
    .use(fileAssets)
    .use(addStoreToRequestPipeline)
    .use('/api', api)
    .use(respond)
