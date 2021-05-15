import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { TextInput, Row, Col, CardPanel, Button, Icon } from 'react-materialize';
import API from '../utils/API';
import SignupNav from '../components/SignupNav';
import M from 'materialize-css';

function SignupPage() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const history = useHistory();

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            M.toast(
                {html: 'Oops! Password fields do not match.'}
            )    
        } else if (firstName === "" || lastName === "") {
            M.toast({html: 'Oops! Please enter your full name.'})
        } else if (document.querySelector('#userEmail').classList.contains('invalid')) {
            M.toast({html: 'Oops! Please enter a valid email address.'});
            setEmail('');
        } else if (password === "" || password === undefined || password.length < 6 || confirmPassword === "") {
            M.toast({html: 'Oops! Please enter a password of at least 6 characters.'})
        } else {
            const newUserData = {
                firstName: firstName,
                lastName: lastName,
                userName: JSON.stringify(firstName + lastName),
                email: email,
                password: password
            }
            API.newUser(newUserData)
            .then((res) => {
                console.log(res);
                M.toast({html: "Signed up successfully!"});
                history.push('/login');
            })
            .catch((err) => {
                if (err) {
                    M.toast({html: 'Oops! Looks like you already have an account with that email.'});
                }
            });   
        };
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
                                id="firstName"
                                name="firstName"
                                label="First name"
                                placeholder="Jackie"
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <TextInput
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                placeholder="Smith"
                                onChange={e => setLastName(e.target.value)}
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
