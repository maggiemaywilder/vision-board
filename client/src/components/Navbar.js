import { Navbar, NavItem, SideNav, SideNavItem, Dropdown, Button, Icon } from 'react-materialize';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import SignupPage from './SignupPage';
// import BoardView from './BoardView';
import LoginPage from './LoginPage';

function Nav() {
    return (
        <Router>
            <Route exact path="/"><SignupPage /></Route>
            {/* <Route exact path="/home" component={BoardView} /> */}
            <Route path="/login"><LoginPage /></Route>
            <Navbar
                alignLinks="right"
                brand={<Link className="brand-logo" to='/login'>Vision Boarder</Link>}
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
                sidenav={
                    <SideNav
                        id="SideNav-10"
                        options={{
                            draggable: true
                        }}
                        trigger={<Button node="button">Options</Button>}
                    >

                        <SideNavItem>
                            <Dropdown
                                id="Dropdown_6"
                                options={{
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    container: null,
                                    coverTrigger: true,
                                    hover: false,
                                    inDuration: 150,
                                    onCloseEnd: null,
                                    onCloseStart: null,
                                    onOpenEnd: null,
                                    onOpenStart: null,
                                    outDuration: 250
                                }}
                                trigger={<Button node="button">My Boards</Button>}
                            >
                                <a href="/">
                                    one
                                </a>
                                <a href="/">
                                    two
                                </a>
                                <a href="/">
                                    three
                                </a>
                            </Dropdown>
                        </SideNavItem>
                        <SideNavItem href="/">
                            Log out
                        </SideNavItem>
                        <SideNavItem divider />
                        <SideNavItem>
                            <a href="/" id="backButton">
                                Back    
                            </a> 
                        </SideNavItem>
                    </SideNav>
                }
            >
                <Dropdown
                    id="Dropdown_7"
                    options={{
                        alignment: 'left',
                        autoTrigger: true,
                        closeOnClick: true,
                        constrainWidth: true,
                        container: null,
                        coverTrigger: true,
                        hover: false,
                        inDuration: 150,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 250
                    }}
                    trigger={<a href="#!">My Boards{' '}<Icon right>arrow_drop_down</Icon></a>}
                    >
                    <a href="#">
                        one
                    </a>
                    <a href="#">
                        two
                    </a>
                </Dropdown>
                <NavItem>
                    <Link to="/">Log out</Link>
                </NavItem>
            </Navbar>
        </Router>
    )
}

export default Nav;