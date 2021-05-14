/* eslint-disable no-unused-vars */
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
    const [currentUserBoards, setCurrentUserBoards] = useState();
    const history = useHistory();

    useEffect(() => {
        API.getBoard(bid)
            .then((res) => {
                console.log(res);
                setBoard(res.data);
                API.getUserBoards(res.data.UserId)
                .then((response) => {
                    setCurrentUserBoards(response.data);
                })
                .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }, [bid]);

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

    const handleLogout = (e) => {
        e.preventDefualt();
        dispatch({
            type: "logoutUser",
            payload: ""
        })
        history.push('/')
    }

    return (
        <>
        <Nav currentUserBoards={currentUserBoards} handleBoardSelect={handleBoardSelect} handleLogout={handleLogout} />
            {board ? <h1>This will be the board view for {board.name}</h1>
            : <p>Finding that board...</p>}
        </>
    )
}

export default BoardView;