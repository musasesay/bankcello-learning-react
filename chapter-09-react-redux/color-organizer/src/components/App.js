import { Menu, NewColor, Colors } from './containers'
import '../../stylesheets/APP.scss'

/** Thanks to the use of the react-redux Provider
* wrapper wrapping App in index.js, instead of setting
* up the store as a context variable in the App component,
* we can keep the App component stateless...
*
*/
const App = () =>
    <div className="app">
        <Menu />
        <NewColor />
        <Colors />
    </div>

export default App
