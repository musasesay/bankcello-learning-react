/* Until node catches up with ES6, you'll need babel-cli => babel-node
* for this ES6-style import statement, Escamillo...
*/
import express from 'express'

/* middleware func: logger()  */
const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}', Escamillo...`)
    next()
}

/* middleware func: sayHello() */
const sayHello = (req, res) => 
    res.status(200).send(
`<h1>Hello, World!</h1>
<h1>Let off some steam, Bennett!</h1>`
    )
    

/* In Express, middleware functions are chained
* together into a pipeline with the .use() method.
* When a request occurs, each middleware function
* is invoked in order until a response is sent.
*/

const app = express()
    .use(logger)
    .use(sayHello)

app.listen(3000, () => 
    console.log(`Recipe app running at 'http://localhost:3000'...`)
)
