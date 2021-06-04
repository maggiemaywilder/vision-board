import { useState, useEffect } from 'react';
import API from '../utils/API';

function UploadNotes(props) {
    const [uploadNotes, setUploadNotes] = useState([])
    useEffect(() => {
        API.getUploadNotes(props.uid)
        .then((res) => {
            setUploadNotes(res.data)
        })
        .catch(err => console.error(err))
    }, [props.uid]);

    return (
        <div className="uploadNotes">
            <h5>Notes:</h5>
            { uploadNotes ? uploadNotes.map((n) => (
                <p key={n.createdAt}>{n.text}</p>
            )) : 
                <p>No notes yet!</p>
            }
        </div>
        
    );
}

export default UploadNotes;