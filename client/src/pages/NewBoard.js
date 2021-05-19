import Nav from '../components/Navbar';
import MyDropzone from '../components/MyDropzone';
import PixabaySearch from '../components/PixabaySearch';
import UserLinks from '../components/UserLinks';
import { Row, Col, CardPanel, TextInput, Button } from 'react-materialize';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
import M from 'materialize-css';


function NewBoard() {
    const { state, dispatch } = useUserContext();
    const currentUser = state[0].user;
    const currentBoard = state[2].currentBoard;
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

    const handleNewBoard = (e) => {
        e.preventDefault();
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
        e.persist();
        const newImgUrl = e.target.parentNode.parentNode.getAttribute('id')
        API.newImage({ img: newImgUrl, bid: currentBoard.id })
            .then((res) => {
                if (res.data) {
                    M.toast({ html: `Image saved to ${boardName} successfully!` });
                    e.target.parentNode.parentNode.style.opacity = "0.2";
                    e.target.style.visibility = "hidden";
                } else {
                    M.toast({ html: "Hmm, we ran into an issue saving that image. Please try again." })
                }
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

    const handleBoardSave = (e) => {
        e.preventDefault();
        if (boardName === "") {
            M.toast({ html: "Looks like your board doesn't have a name..." })
        } else {
            API.updateBoard(parseInt(currentBoard.id), { name: boardName })
                .then((res) => {
                    console.log(res);
                    M.toast({ html: `${boardName} saved!` });
                    dispatch({
                        type: "setCurrentBoard",
                        payload: currentBoard
                    });
                    history.push(`/boards/${currentBoard.id}`);
                })
        }

    }

    return (
        <>
            <Nav currentUserBoards={currentUserBoards} handleBoardSelect={handleBoardSelect} handleNewBoard={handleNewBoard} />
            <Row>
                <Col s={12} l={6}>
                    <div id="newBoardName">
                        <TextInput style={{ width: 500 }}
                            id="name"
                            label="Board Name"
                            name="boardName"
                            placeholder="New Board"
                            value={boardName}
                            onChange={e => setBoardName(e.target.value)}
                        />
                    </div>
                </Col>
                <Col s={12} l={6}>
                    <div className="container">
                        <Button className="orange darken-3" onClick={handleBoardSave}>Save {boardName}</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col l={6} s={12}>
                    <CardPanel className="teal darken-3">
                        <span className="white-text">
                            Add Personal Images and Files (PDF, .jpeg, or .png)
                    </span>
                    </CardPanel>
                    <MyDropzone bid={currentBoard.id} boardName={boardName} />
                    <Row>
                        <CardPanel className="teal darken-3">
                            <span className="white-text">
                                Add Inspiration, Research, or Video Links from the web
                            </span>
                        </CardPanel>
                        <UserLinks bid={currentBoard.id} />
                    </Row>
                </Col>
                <PixabaySearch handleImgSave={handleImgSave} />
            </Row>
        </>
    )
}

export default NewBoard;