/* eslint-disable no-unused-vars */
import Nav from '../components/Navbar';
import { Row, Col, Card, CardPanel, CardTitle, Collection, CollectionItem, TextInput, Button, Icon } from 'react-materialize';
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';
import MyDropzone from '../components/MyDropzone';
import PixabaySearch from '../components/PixabaySearch';
import UserLinks from '../components/UserLinks';
import AddTags from '../components/AddTags';
import BoardTags from '../components/BoardTags';
import M from 'materialize-css';

function BoardView() {
    const { state, dispatch } = useUserContext();
    const { bid } = useParams();
    const [board, setBoard] = useState();
    const [currentUserBoards, setCurrentUserBoards] = useState();
    const [currentUserId, setCurrentUserId] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [currentUploads, setCurrentUploads] = useState([]);
    const [currentImages, setCurrentImages] = useState();
    const [currentLinks, setCurrentLinks] = useState();
    const [updatedName, setUpdatedName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
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
                API.getUserById(res.data.UserId)
                    .then((res) => {
                        setCurrentUser(res.data);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        API.getUploads(bid)
            .then((res) => {
                setCurrentUploads(res.data);
            })
            .catch(err => console.error(err));
        API.getImages(bid)
            .then((res) => {
                setCurrentImages(res.data)
            })
            .catch(err => console.error(err));
        API.getLinks(bid)
            .then((res) => {
                setCurrentLinks(res.data)
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
                setCurrentUser(res.data);
            })
            .then(() => {
                API.newBoard(currentUserId)
                    .then((res) => {
                        dispatch({
                            type: "setCurrentUser",
                            payload: currentUser
                        });
                        history.push(`/boards/new/${res.data.id}`)
                    })
                    .catch(err => console.error(err))
            })
            .catch((err) => console.error(err));
    }

    const handleBoardEdit = (e) => {
        e.preventDefault();
        e.persist();
        document.querySelectorAll('.deleteImgBtn').forEach(el => el.style.display = "inline");
        document.querySelectorAll('.deleteUploadBtn').forEach(el => el.style.display = "inline");
        document.querySelectorAll('.deleteLinkBtn').forEach(el => el.style.display = "inline")
        document.querySelector('#boardViewRename').style.display = "inline";
        document.querySelector('#boardSaveBtn').style.display = "inline";
        e.target.style.display = 'none';
        setIsEditing(true);
    }

    const handleImgSave = (e) => {
        e.preventDefault();
        e.persist();
        const newImgUrl = e.target.parentNode.parentNode.getAttribute('id')
        API.newImage({ img: newImgUrl, bid: board.id })
            .then((res) => {
                if (res.data) {
                    M.toast({ html: `Image saved to ${board.name} successfully!` });
                    e.target.parentNode.parentNode.style.opacity = "0.2";
                    e.target.style.visibility = "hidden";
                } else {
                    M.toast({ html: "Hmm, we ran into an issue saving that image. Please try again." })
                }
            })
            .catch(err => console.error(err))
    }

    const handleUploadDel = (e) => {
        e.preventDefault();
        e.persist();
        const mid = e.target.getAttribute('id');
        API.deleteUpload(mid)
            .then((res) => {
                console.log(res);
                e.target.parentNode.classList.add('disabled');
                M.toast({ html: "Upload deleted!" });
            })
            .catch(err => console.error(err))
    }

    const handleImgDel = (e) => {
        e.preventDefault();
        e.persist();
        const iid = e.target.getAttribute('id');
        API.deleteImg(iid)
            .then((res) => {
                console.log(res);
                e.target.parentNode.classList.add('disabled');
                M.toast({ html: "Image deleted!" });
            })
            .catch(err => console.error(err))
    }

    const handleLinkDel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.persist();
        const lid = e.target.getAttribute('id');
        API.deleteLink(lid)
            .then((res) => {
                console.log(res);
                e.target.parentNode.classList.add('disabled');
                M.toast({ html: "Link deleted!" });
            })
            .catch(err => console.error(err))
    }

    const handleBoardUpdate = (e) => {
        e.preventDefault();
        if (updatedName !== "") {
            API.updateBoard(board.id, { name: updatedName })
                .then((res) => {
                    if (res.data) window.location.reload();
                })
                .catch(err => console.error(err));
        } else {
            window.location.reload();
        }
    }

    const handleLogout = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
        <>
            <Nav currentUserBoards={currentUserBoards} handleBoardSelect={handleBoardSelect} handleNewBoard={handleNewBoard} handleLogout={handleLogout} />
            <Row>
                {board ?
                    <>
                        <div id="boardViewName">
                            <h2>{board.name}</h2>
                        </div>
                        <div id="boardViewRename">
                            <h4>
                                <TextInput
                                    id="updateBoardName"
                                    value={updatedName}
                                    onChange={e => setUpdatedName(e.target.value)}
                                />
                            </h4>
                        </div>
                        <Button onClick={handleBoardEdit}>Edit</Button>
                        <Button className="red darken-2" id="boardSaveBtn" onClick={handleBoardUpdate}>Save</Button>
                    </>
                    : <p>Finding that board...</p>}
            </Row>
            <Row>
                <Col s={12} l={8}>
                    {currentUploads ?
                        currentUploads.map((u) => (
                            <Card key={u.id}
                                actions={[
                                    <Button
                                        key={u.id}
                                        id={u.id}
                                        className="red deleteUploadBtn"
                                        onClick={handleUploadDel}
                                        icon={<Icon id={u.id}>delete</Icon>}
                                        alt="Remove this upload"
                                        node="button"
                                        waves="light"
                                    />
                                ]}
                                header={<CardTitle image={u.url} />}
                                horizontal
                                className="hoverable boardViewUpload"
                            >
                                Tags:
                            </Card>
                        )) :
                        <h4>Loading uploads...</h4>
                    }
                </Col>
                <Col s={12} l={4}>
                    <Row>
                        {currentImages ?
                            currentImages.map((i) => (
                                <Card key={i.id}
                                    actions={[
                                        <Button
                                            key={i.id}
                                            id={i.id}
                                            className="red deleteImgBtn"
                                            onClick={handleImgDel}
                                            icon={<Icon id={i.id}>delete</Icon>}
                                            alt="Remove this image"
                                            node="button"
                                            waves="light"
                                        />
                                    ]}
                                    header={<CardTitle image={i.url} />}
                                    horizontal
                                    className="hoverable boardViewImg"
                                >
                                </Card>
                            )) :
                            <h4>Loading images...</h4>
                        }
                    </Row>
                    <Row>
                        <Collection header="Links">
                            {currentLinks ?
                                currentLinks.map((l) => (
                                    <CollectionItem key={l.id} href={l.url} target="_blank">
                                        {l.url} - {l.type}
                                        <Button
                                            id={l.id}
                                            className="deleteLinkBtn"
                                            onClick={handleLinkDel}
                                            icon={<Icon id={l.id}>delete</Icon>}
                                            alt="Remove this link"
                                            node="button"
                                            waves="light"
                                        />
                                    </CollectionItem>
                                )) :
                                <div>
                                    <p>Loading links...</p>
                                </div>
                            }
                        </Collection>
                    </Row>
                    <Row>
                        { board ?
                        <div id="currentBoardTags">
                            <h4>Tags</h4>
                            <Row>
                                <BoardTags boardID={board.id} boardName={board.name} />
                            </Row>
                            <Row>
                                <AddTags boardID={board.id} boardName={board.name} />
                            </Row>
                        </div>
                            :
                            <p>Loading tags...</p>
                        }
                        
                    </Row>
                </Col>
            </Row>
            { isEditing ?
                <Row>
                    <Col l={6} s={12}>
                        <CardPanel className="teal darken-3">
                            <span className="white-text">
                                Add Personal Images (.jpeg, or .png)
                        </span>
                        </CardPanel>
                        <MyDropzone bid={board.id} boardName={board.name} />
                        <Row>
                            <CardPanel className="teal darken-3">
                                <span className="white-text">
                                    Add Inspiration, Research, or Video Links from the web
                                </span>
                            </CardPanel>
                            <UserLinks bid={board.id} />
                        </Row>
                    </Col>
                    <PixabaySearch handleImgSave={handleImgSave} />
                </Row>
                :
                <div>
                </div>
            }

        </>
    )
}

export default BoardView;