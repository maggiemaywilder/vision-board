import Nav from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState';
import API from '../utils/API';

function BoardView() {
    const [state, dispatch] = useUserContext();
    const currentUser = state[0].user;

    return (
        <>
        <Nav />
        <div>Hello, {currentUser.userName}!</div>
        </>
    )
}

export default BoardView;