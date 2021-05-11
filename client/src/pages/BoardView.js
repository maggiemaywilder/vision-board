import Nav from '../components/Navbar';
import { Row, Col, Card, Button } from 'react-materialize';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';

function BoardView() {
    const { state, dispatch } = useUserContext();
    const currentUser = state.user;
    const history = useHistory();

    function getBoards(uid) {
        API.getUserBoards(uid)
            .then((res) => {
                console.log(res);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getBoards(currentUser.id);
    }, [currentUser.id]);

    const handleNewBoard = () => {
        dispatch({
            type: "setNewBoard",
            payload: currentUser
        });
        history.push(`/boards/${currentUser.id}/new`)
    }

    return (
        <>
            <Nav />
            <Button
                large
                node="a"
                style={{
                    marginRight: '5px'
                }}
                waves="light"
                onClick={handleNewBoard}
            >
                New Board
            </Button>
        </>
    )
}

export default BoardView;