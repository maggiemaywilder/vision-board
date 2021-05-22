import { Badge, Button, Icon } from 'react-materialize';
import { useState, useEffect } from 'react';
import API from '../utils/API';

function BoardTags(props) {
    const [currentTags, setCurrentTags] = useState([]);

    useEffect(() => {
        API.getTags(props.boardID)
            .then((res) => {
                setCurrentTags(res.data);
            })
            .catch(err => console.error(err));
    }, [props.boardID]);

    const handleTagDelete = (e) => {
        e.preventDefault();
        API.deleteTag(e.target.getAttribute('id'))
        .then((res) => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            { currentTags ?
                currentTags.map((t) => (
                    <Badge key={t.id}
                        className="red white-text"
                    >
                        {t.tagName}
                        <Button
                            id={t.id}
                            className="deleteTag"
                            flat
                            waves="light"
                            onClick={handleTagDelete}
                        >
                            <Icon id={t.id}>close</Icon>
                        </Button>

                    </Badge>
                ))
                :
                <p>Loading tags for {props.boardName}</p>
            }
        </div>
    )

}

export default BoardTags;