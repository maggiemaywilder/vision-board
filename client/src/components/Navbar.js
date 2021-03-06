import { Navbar, NavItem, SideNav, SideNavItem, Dropdown, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
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
                    <SideNavItem>
                        <Button
                            large
                            id="newBoardBtn"
                            node="button"
                            style={{
                                marginRight: '5px'
                            }}
                            waves="light"
                            onClick={props.handleNewBoard}
                        >
                            Create New Board
                        </Button>
                    </SideNavItem>
                    <SideNavItem>
                        <Link to='/' onClick={props.handleLogout}>Log out</Link>
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
                trigger={<Link>My Boards<Icon right>arrow_drop_down</Icon></Link>}
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
                <Button
                    large
                    id="newBoardBtn2"
                    node="button"
                    style={{
                        marginRight: '5px'
                    }}
                    waves="light"
                    onClick={props.handleNewBoard}
                >
                    Create New Board
                </Button>
            </NavItem>
            <NavItem>
                <Link to='/' onClick={props.handleLogout}>Log out</Link>
            </NavItem>
        </Navbar>
    )
}

export default Nav;