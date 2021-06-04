import { useState, useEffect } from 'react';
import API from '../utils/API';

function ImageNotes(props) {
    const [imgNotes, setImgNotes] = useState([]);
    useEffect(() => {
        API.getImgNotes(props.iid)
        .then((res) => {
            setImgNotes(res.data)
        })
        .catch(err => console.error(err))
    }, [props.iid]);

    return (
        <div className="imageNotes">
            <h5>Notes:</h5>
            { imgNotes ? imgNotes.map((n) => (
                <p key={n.createdAt}>{n.text}</p>
            )) : 
                <p>No notes yet!</p>
            }
        </div>
        
    );
}

export default ImageNotes;