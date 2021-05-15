import { Row, Col, Card, CardTitle, CardPanel, TextInput, Button, Icon } from 'react-materialize';
import { useState } from 'react';
import pixabay from '../utils/pixabay';

function PixabaySearch(props) {
    const [currentSearch, setCurrentSearch] = useState("");
    const [currentPix, setCurrentPix] = useState();

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentSearch(e.target.value);
        pixabay.search(currentSearch)
            .then((res) => {
                setCurrentPix(res.data.hits);
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <Col l={6} s={12}>
                <Row>
                    <CardPanel className="teal darken-3">
                        <span className="white-text">
                            Search Pixabay to Add Photos
                    </span>
                    </CardPanel>
                </Row>
                <Row>
                    <TextInput style={{ width: 500 }}
                        name="currentSearch"
                        icon="search"
                        label="Search..."
                        value={currentSearch}
                        onChange={handleSearch}
                    />
                </Row>
                <Row>
                    {currentPix ?
                    <>
                        {currentPix.map((pic, i) => (
                             <Card key={i}
                             id={pic.webformatURL}
                             actions={[
                               <Button className="orange darken-3" onClick={props.handleImgSave}>Save to Board</Button>
                             ]}
                             header={<CardTitle image={pic.webformatURL}><span className="imgCardTitle">{pic.tags}</span></CardTitle>}
                           >
                           </Card>
                        ))}
                    </>    
                        : <h5>No search data yet</h5>}
                </Row>
            </Col>
        </>
    )
}

export default PixabaySearch;