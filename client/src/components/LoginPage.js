import { useState } from 'react';
import { Row, Col, TextInput, Button, CardPanel } from 'react-materialize';
import SignupNav from './SignupNav';
import M from 'materialize-css';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = (e) => {
        e.preventDefault();
        if (document.querySelector('#userEmail').classList.contains('invalid')) {
            M.toast({html: "Oops! Looks like that email is invalid. Try again."});
            setEmail("");
        } else {
            console.log(`Email: ${email}, Password: ${password}`);
            window.location.href = '/boards';
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
                                email
                                validate
                                id="userEmail"
                                name="email"
                                label="Email"
                                placeholder={email}
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