import Nav from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../utils/GlobalState';

function BoardView() {
    const [state, dispatch] = useUserContext();

    return (
        <>
        <Nav />
        <h1>{JSON.stringify(state[0])}</h1>
        </>
    )
}

export default BoardView;