import { Button, TextInput, Icon } from 'react-materialize';
import { useState } from 'react';
import API from '../utils/API';

function AddTags(props) {
    const [newTag, setNewTag] = useState('');

    const handleNewTag = (e) => {
        e.preventDefault();
        API.newTag(props.boardID, {
            text: newTag,
        })
            .then(() => {
                window.location.reload();
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <TextInput
                style={{width:300}}
                id="newTag"
                label={`Add a new tag to ${props.boardName}...`}
                onChange={e => setNewTag(e.target.value)}
            />
            <Button
                className="red"
                floating
                icon={<Icon>add</Icon>}
                small
                node="button"
                waves="light"
                onClick={handleNewTag}
            />
        </>
    )
}

export default AddTags;