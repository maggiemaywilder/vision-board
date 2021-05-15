import { Row, Col, MediaBox, CardPanel, TextInput, Button } from 'react-materialize';
import { useState } from 'react';
import pixabay from '../utils/pixabay';

function PixabaySearch() {
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
                    {currentSearch ?
                        currentPix.map((pic, i) => (
                            <>
                                <MediaBox key={i}
                                    id={`picture${i}`}
                                    options={{
                                        inDuration: 275,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        outDuration: 200
                                    }}
                                >
                                    <img
                                        alt=""
                                        src={pic.webformatURL}
                                        width="650"
                                    />
                                </MediaBox>
                                <p>{pic.tags}</p>
                            </>
                        ))
                        : <h5>No search data yet</h5>}
                </Row>
            </Col>
        </>
    )
}

export default PixabaySearch;