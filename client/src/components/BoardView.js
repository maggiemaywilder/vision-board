import Nav from './Navbar';
import { useParams } from 'react-router-dom';
import  { useState, useEffect } from 'react';

function BoardView() {

    return (
        <>
        <Nav />
        <h1>This will be the board view</h1>
        </>
    )
}

export default BoardView;