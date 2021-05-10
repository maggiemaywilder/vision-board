import Nav from '../components/Navbar';
import { useParams } from 'react-router-dom';
import  { useState, useEffect } from 'react';

function BoardView() {
    const userId = useParams();
    return (
        <>
        <Nav />
        <h1>This will be the board view for User: {userId}</h1>
        </>
    )
}

export default BoardView;