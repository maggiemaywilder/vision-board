import { Navbar, NavItem, Icon } from 'react-materialize';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Link } from 'react-router-dom'
// import LoginPage from './LoginPage';
// import SignupPage from './SignupPage';


function SignupNav() {
    return (
        <Navbar
            alignLinks="left"
            brand={<Link className="brand-logo right" to='/'>Vision Boarder</Link>}
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
            }}
        >
            <NavItem>
                 <Link to="/login">Log in</Link>
            </NavItem>
        </Navbar>
    )
}

export default SignupNav;