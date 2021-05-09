import { Navbar, NavItem, Icon } from 'react-materialize';
import { Link } from 'react-router-dom'

function SignupNav() {
    return (
        <Navbar
            alignLinks="left"
            brand={<a className="brand-logo right" href='/'>Vision Boarder</a>}
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