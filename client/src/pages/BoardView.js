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
    const [currentUserId, setCurrentUserId] = useState();
    const [currentUser, setCurrentUser] = useState();
    const history = useHistory();

    useEffect(() => {
        API.getBoard(bid)   
            .then((res) => {
                setBoard(res.data);
                setCurrentUserId(res.data.UserId);
                API.getUserBoards(res.data.UserId)
                .then((response) => {
                    setCurrentUserBoards(response.data);
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, [bid]);

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
        API.getUserById(currentUserId)
        .then((res) => {
            setCurrentUser(res.data)
        })
        .catch((err) => console.error(err));

        API.newBoard(currentUserId)
            .then((res) => {
                dispatch({
                    type: "setCurrentBoard",
                    payload: res.data
                });
                dispatch({
                    type: "setCurrentUser",
                    payload: currentUser
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
            {board && currentUserId ? <h1>Hi UserID: {currentUserId}! This will be the board view for {board.name}</h1>
            : <p>Finding that board...</p>}  
        </>
    )
}

export default BoardView;