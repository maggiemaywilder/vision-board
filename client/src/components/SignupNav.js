import { Navbar, NavItem, Icon } from 'react-materialize';

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
                 <a href="/login">Log in</a>
            </NavItem>
        </Navbar>
    )
}

export default SignupNav;