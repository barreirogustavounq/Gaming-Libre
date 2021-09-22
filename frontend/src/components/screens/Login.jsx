import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../style/Login.css";
import {login} from '../../api/Api'
import {Alert} from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    function handleSubmit(event) {
        event.preventDefault();
        let user;
        login(username, password).then(result => {
            user = result.data;
            if(user){
                setError(false)
                localStorage.setItem('user', result.data.username)
                window.location.reload()
            }}).catch(error => {
                setError(true)
        })
    }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
                <Alert className="alertButton" variant={error ? "danger" : "secondary"}>
                    <Alert.Heading>{error ? "Bad username or password, try again or: " : "Don't have an account yet?"}</Alert.Heading>
                    <Alert.Link href="http://localhost:3000/register">click here to register</Alert.Link>.
                </Alert>
            </Form>
        </div>
    );
}

export default Login;
