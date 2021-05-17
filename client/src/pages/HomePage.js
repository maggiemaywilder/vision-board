import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../utils/API";
import { useUserContext } from '../utils/GlobalState';
import Nav from '../components/Navbar';
import { Row, Col, CardPanel } from 'react-materialize';

function HomePage() {
    const { state, dispatch } = useUserContext();
    const currentUser = state[0].user
    const [currentUserBoards, setCurrentUserBoards] = useState();
    const history = useHistory();

    useEffect(() => {
        API.getUserBoards(currentUser.id)
            .then((response) => {
                setCurrentUserBoards(response.data);
            })
            .catch(err => console.error(err))
}, [currentUser.id]);

const handleBoardSelect = (e) => {
    const bid = e.target.id
    API.getBoard(bid)
        .then((res) => {
            dispatch({
                type: "setCurrentBoard",
                payload: res.data
            });
        })    
        .then(() => {
            history.push(`/boards/${bid}`)
        })
        .catch(err => console.error(err))
}

const handleNewBoard = () => {
    API.newBoard(currentUser.id)
        .then((res) => {
            console.log(res);
            dispatch({
                type: "setCurrentUser",
                payload: currentUser
            });
            dispatch({
                type: "setCurrentBoard",
                payload: res.data
            });
            history.push(`/boards/new/${res.data.id}`)
        })
        .catch(err => console.error(err))
}

const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
        type: "logoutUser",
        payload: ""
    });
    history.push('/');
}

return (
    <>
        <Nav currentUserBoards={currentUserBoards} handleBoardSelect={handleBoardSelect} handleNewBoard={handleNewBoard} handleLogout={handleLogout} />
        <Row>
            <Col
                m={6}
                s={12}
            >
                <CardPanel className="teal darken-3">
                    <span className="white-text">
                        Welcome back to Vision Boarder, {currentUser.firstName}. Select a board or click Create New Board to get started.
                        </span>
                </CardPanel>
            </Col>
        </Row>
    </>
)
}

export default HomePage;