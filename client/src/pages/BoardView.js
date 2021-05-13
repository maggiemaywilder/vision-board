import Nav from '../components/Navbar';
import { Row, Col, Card, Button } from 'react-materialize';
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';

function BoardView() {
    const { state, dispatch } = useUserContext();
    const { bid } = useParams();
    const [board, setBoard] = useState();
    const [currentUserId, setCurrentUserId] = useState();
    const [currentUserBoards, setCurrentUserBoards] = useState();
    const history = useHistory();

    useEffect(() => {
        API.getBoard(bid)
            .then((res) => {
                setBoard(res.data);
                setCurrentUserId(res.data.UserId);
            })
            .then(() => {
                API.getUserBoards(currentUserId)
                    .then((res) => {
                        setCurrentUserBoards(res.data);
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }, [currentUserId, bid]);

    const handleBoardSelect = (e) => {
        const bid = e.target.id
        API.getBoard(bid)
            .then((res) => {
                console.log('Current board: ', res.data);
                dispatch({
                    type: "setCurrentBoard",
                    payload: res.data
                });
                history.push(`/boards/${bid}`)
            })
    }

    return (
        <>
        <Nav currentUserBoards={currentUserBoards} handleBoardSelect={handleBoardSelect} />
            {board ? <h1>This will be the board view for {board.name}</h1>
            : <p>Finding that board...</p>}
        </>
    )
}

export default BoardView;