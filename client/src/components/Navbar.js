import { Navbar, NavItem, SideNav, SideNavItem, Dropdown, Button, Icon } from 'react-materialize';
import 'materialize-css';

function Nav() {
    return (
        <>
            <Navbar
                alignLinks="right"
                brand={<a className="brand-logo" href="#">Vision Boarder</a>}
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
                                <a href="#">
                                    one
                                </a>
                                <a href="#">
                                    two
                                </a>
                                <a href="#">
                                    three
                                </a>
                            </Dropdown>
                        </SideNavItem>
                        <SideNavItem href="">
                            Log out
                        </SideNavItem>
                        <SideNavItem divider />
                        <SideNavItem>
                            <a href="" id="backButton">
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
                <NavItem href="">
                    Log out
                </NavItem>
            </Navbar>
        </>
    )
}

export default Nav;