/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col, TextInput, Button, CardPanel } from 'react-materialize';
import { useUserContext } from '../utils/GlobalState';
import SignupNav from '../components/SignupNav';
import M from 'materialize-css';
import API from '../utils/API';

function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { state, dispatch } = useUserContext();

    const handleSignin = (e) => {
        e.preventDefault();
        if (document.querySelector('#userEmail').classList.contains('invalid')) {
            M.toast({html: "Oops! Looks like that email is invalid. Try again."});
            setEmail("");
        } else {
            const userData = {
                email: email,
                password: password
            }
            API.loginUser(userData)
            .then((res) => {
                if (res.statusCode === 404) {
                    M.toast({html: "Oops! Looks like your account wasn't found. Try again."})
                } else {
                    dispatch({ 
                        type: 'setCurrentUser',
                        payload: res.data
                    });
                    history.push(`/users/${res.data.userName}`) 
                }
                
            })
            .catch(err => console.error(err));
        }
    }

    return (
        <>
            <SignupNav />
            <div className="container">
                <Row>
                    <Col
                        m={8}
                        s={12}
                    >
                        <CardPanel className="teal">
                            <span className="white-text">
                                Welcome back to Vision Boarder! Sign in with your email address and password below.
                            </span>
                        </CardPanel>
                    </Col>
                </Row>
                <Row>
                    <Col
                        m={6}
                        s={12}
                    >
                        <Row>
                            <TextInput
                                id="userEmail"
                                name="email"
                                label="Email"
                                validate
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <TextInput
                                password
                                id="userPassword"
                                name="password"
                                label="Password"
                                placeholder={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <Button onClick={handleSignin}
                                large
                                node="button"
                                style={{
                                    marginRight: '5px'
                                }}
                                waves="light"
                            >
                            Sign in 
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>                        
    )
}

export default LoginPage;