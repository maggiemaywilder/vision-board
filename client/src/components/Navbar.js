import { Navbar, NavItem, SideNav, SideNavItem, Dropdown, Button, Icon } from 'react-materialize';

function Nav(props) {

    return (
        <Navbar
            alignLinks="right"
            brand={<a className="brand-logo" href='/login'>Vision Boarder</a>}
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
                    trigger={<Button node="button">My Boards</Button>}
                >
                    {props.currentUserBoards ? props.currentUserBoards.map((board) => {
                        return (
                            <>
                            <SideNavItem key={board.id}>
                            <a href={`/boards/${board.id}`} id={board.id} onClick={props.handleBoardSelect}>
                                {board.name}
                            </a>
                            </SideNavItem>
                            <SideNavItem divider />
                            </>
                        )
                    }) : <p>Loading...</p>}

                    <SideNavItem href="/">
                        Log out
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
                trigger={<a href="#">My Boards{' '}<Icon right>arrow_drop_down</Icon></a>}
            >
                {props.currentUserBoards ? props.currentUserBoards.map((board) => {
                    return (
                        <a key={board.id} href={`/boards/${board.id}`} onClick={props.handleBoardSelect}>
                            {board.name}
                        </a>
                    )
                }) : <p>Loading...</p>}
            </Dropdown>
            <NavItem>
                <a href="/">Log out</a>
            </NavItem>
        </Navbar>
    )
}

export default Nav;