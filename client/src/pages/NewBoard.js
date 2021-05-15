import Nav from '../components/Navbar';
import MyDropzone from '../components/MyDropzone';
import PixabaySearch from '../components/PixabaySearch';
import { Row, Col, CardPanel, TextInput, Button } from 'react-materialize';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';


function NewBoard() {
    const { state, dispatch } = useUserContext();
    const currentUser = state[0].user;
    const [currentUserBoards, setCurrentUserBoards] = useState();
    const [boardName, setBoardName] = useState("");
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

    const handleImgSave = (e) => {
        e.preventDefault();
        const newImgUrl  = e.target.parentNode.parentNode.getAttribute('id')
        API.newImage(newImgUrl.toString())
        .then((res) => {
            console.log(res);
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
            <Nav currentUserBoards={currentUserBoards} handleBoardSelect={handleBoardSelect} />
            <Row>
                <div id="newBoardName">
                    <TextInput style={{ width: 500 }}
                        id="name"
                        label="Board Name"
                        name="boardName"
                        placeHolder="New Board"
                        value={boardName}
                        onChange={e => setBoardName(e.target.value)}
                    />
                </div>
                <Button
                    large
                    id="newBoardBtn"
                    node="a"
                    style={{
                        marginRight: '5px'
                    }}
                    waves="light"
                    onClick={handleNewBoard}
                >
                    Create New Board
                </Button>
            </Row>
            <Row>
                <Col l={6} s={12}>
                    <CardPanel className="teal darken-3">
                        <span className="white-text">
                            Add Personal Photos or Files
                    </span>
                    </CardPanel>
                    <MyDropzone />
                </Col>
                <PixabaySearch handleImgSave={handleImgSave}/>
            </Row>
        </>
    )
}

export default NewBoard;