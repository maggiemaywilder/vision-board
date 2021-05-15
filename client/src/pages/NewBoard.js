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
                dispatch({
                    type: "setCurrentUser",
                    payload: currentUser
                });
                history.push(`/boards/new/${res.data.id}`)
            })
            .catch(err => console.error(err))
    }

    const handleImgSave = (e) => {
        e.preventDefault();
        const newImgUrl = e.target.parentNode.parentNode.getAttribute('id')
        API.newImage(newImgUrl.toString())
            .then((res) => {
                console.log(res);
            })
            .catch(err => console.error(err))
    }

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

    return (
        <>
            <Nav currentUserBoards={currentUserBoards} handleBoardSelect={handleBoardSelect} handleNewBoard={handleNewBoard} />
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
                <PixabaySearch handleImgSave={handleImgSave} />
            </Row>
        </>
    )
}

export default NewBoard;