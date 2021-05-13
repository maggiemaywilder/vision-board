import Nav from '../components/Navbar';
import { Row, Col, Card, Button } from 'react-materialize';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';

function NewBoard() {
    const { state, dispatch } = useUserContext();
    const currentUser = state[0].user;
    const [currentUserBoards, setCurrentUserBoards] = useState();
    const history = useHistory();

    useEffect(() => {
        API.getUserBoards(currentUser.id)
        .then((res) => {
            setCurrentUserBoards(res.data);
        })
        .catch(err => console.error(err))
    }, [currentUser.id]);

    const handleNewBoard = () => {
        API.newBoard(currentUser)
        .then((res) => {
            console.log(res);
            dispatch({
                type: "setCurrentBoard",
                payload: res.data  
            });
            history.push(`/boards/${res.data.id}`)
        })
        .catch(err => console.error(err))   
    }

    const handleBoardSelect = (bid) => {
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
            <Nav currentUserBoards={currentUserBoards} handleBoardSelect={handleBoardSelect}/>
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

export default NewBoard;