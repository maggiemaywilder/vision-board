import { Row, TextInput, Select, Button } from 'react-materialize';
import { useState } from 'react';
import API from '../utils/API';
import M from 'materialize-css';


function UserLinks(props) {
    const [link, setLink] = useState();
    const [type, setType] = useState();

    const handleLinkSave = (e) => {
        const typeSelect = document.querySelector('#typeSelect');
        e.preventDefault();
        setType(typeSelect.options[typeSelect.selectedIndex].value);
        API.newLink({url: link, type: type}, props.bid)
        .then((res) => {
            if (res.data) {
                M.toast({html: "Link saved!"});
                setLink("");
            } else {
                M.toast({html: "Hmm, looks like there was an error saving that link. Try again."});
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="container">
            <Row>
                <TextInput
                    id="addLink"
                    label="Add a link..."
                    value={link}
                    style={{width: 400}}
                    onChange={e => setLink(e.target.value)}
                />
            </Row>
            <Row>
                <Select
                    id="typeSelect"
                    multiple={false}
                    onChange={function noRefCheck() { }}
                    options={{
                        classes: '',
                        dropdownOptions: {
                            alignment: 'left',
                            autoTrigger: true,
                            closeOnClick: true,
                            constrainWidth: true,
                            coverTrigger: true,
                            hover: false,
                            inDuration: 150,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            outDuration: 250
                        }
                    }}
                    value=""
                >
                    <option value="inspiration">
                        Inspiration
                    </option>
                    <option value="research">
                        Research
                    </option>
                    <option value="video">
                        Video
                    </option>
                </Select>
                <Button className="orange darken-3" onClick={handleLinkSave}>Save</Button>
            </Row>
        </div>
    )
}

export default UserLinks;