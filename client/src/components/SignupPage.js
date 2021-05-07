import { useState } from 'react';
import { TextInput, Row, Col, CardPanel, Button, Toast, Icon } from 'react-materialize';
import SignupNav from './SignupNav';
import M from 'materialize-css'

function SignupPage() {
    const [userName, setUsername] = useState();
    let [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            M.toast(
                {html: 'Oops! Password fields do not match.'}
            )    
        } else if (userName === "") {
            M.toast({html: 'Oops! Please enter your name.'})
        } else if (document.querySelector('#userEmail').classList.contains('invalid')) {
            M.toast({html: 'Oops! Please enter a valid email address.'});
            setEmail('');
        } else if (password === "" || password.length < 6 || confirmPassword === "") {
            M.toast({html: 'Oops! Please enter a password of at least 6 characters.'})
        } else {
            console.log("username is " + userName);
            console.log("email is " + email);
            console.log(`password is ${password}`);
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
                                Welcome to Vision Boarder! Sign up with your name and email address below.
                            </span>
                        </CardPanel>
                    </Col>
                </Row>
                <Row>
                    <Col id="signupForm"
                        m={6}
                        s={12}
                    >
                        <Row>
                            <TextInput
                                id="userName"
                                name="userName"
                                placeholder="Jackie Smith"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <TextInput
                                email
                                id="userEmail"
                                name="email"
                                label="Email"
                                validate
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <TextInput
                                id="userPassword"
                                name="password"
                                label="Password"
                                password
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <TextInput
                                id="confirmPassword"
                                label="Confirm Password"
                                name="confirmPassword"
                                password
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Button
                        node="button"
                        type="button"
                        waves="light"
                        onClick={handleSignUp}
                    >
                        Sign up
                    <Icon right>send</Icon>
                    </Button>
                </Row>
            </div>
        </>
    )
}

export default SignupPage;
