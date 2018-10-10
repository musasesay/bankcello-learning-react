import HomeIcon from 'react-icons/lib/fa/home'
import { NavLink } from 'react-router-dom'
import './stylesheets/menus.scss'

const selectedStyle = {
    backgroundColor: "white",
    color: "slategray"
}

// The MainMenu component uses the NavLink component.
//
// The NavLink component can be used to create links
// that can be styled when they are active.  
//
// The `activeStyle` property can be used to set
// the CSS to indicate which link is active or
// currently selected...
//
// The MainMenu component will be used in the
// PageTemplate component...
export const MainMenu = () =>
    <nav className="main-menu" style={{border: "4px dashed green"}}>
        <NavLink to="/"><HomeIcon/></NavLink>
        <NavLink to="/about" activeStyle={selectedStyle}>[About]</NavLink>
        <NavLink to="/events" activeStyle={selectedStyle}>[Events]</NavLink>
        <NavLink to="/products" activeStyle={selectedStyle}>[Products]</NavLink>
        <NavLink to="/contact" activeStyle={selectedStyle}>[Contact Us]</NavLink>
    </nav>

export const AboutMenu = ({ match }) =>
    <div className="about-menu" style={{border: "4px dashed red"}}>
        <li>
            <NavLink to="/about"
                  style={match.isExact && selectedStyle}>
                [Company]
            </NavLink>
        </li>
        <li>
            <NavLink to="/about/history"
                  activeStyle={selectedStyle}>
                [History]
            </NavLink>
        </li>
        <li>
            <NavLink to="/about/services"
                  activeStyle={selectedStyle}>
                [Services]
            </NavLink>
        </li>
        <li>
            <NavLink to="/about/motto"
                  activeStyle={selectedStyle}>
                [Motto]
            </NavLink>
        </li>
        <li>
            <NavLink to="/about/location"
                  activeStyle={selectedStyle}>
                [Location]
            </NavLink>
        </li>
    </div>
